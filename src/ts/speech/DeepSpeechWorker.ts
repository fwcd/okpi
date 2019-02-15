import * as ds from "deepspeech";
import { DelayedTask } from "../utils/DelayedTask";
import { LOG } from "../utils/Logger";
import { DsInitializeRequest, DsWorkerMessage, DsFeedRequest } from "./DeepSpeechWorkerProtocol";
import { isMainThread, parentPort } from "worker_threads";

// Source: https://github.com/mozilla/DeepSpeech/blob/master/native_client/javascript/client.js

// These constants control the beam search decoder

// Beam width used in the CTC decoder when building candidate transcriptions
const BEAM_WIDTH = 500;

// The alpha hyperparameter of the CTC decoder. Language Model weight
const LM_ALPHA = 0.75;

// The beta hyperparameter of the CTC decoder. Word insertion bonus.
const LM_BETA = 1.85;

// These constants are tied to the shape of the graph used (changing them changes
// the geometry of the first layer), so make sure you use the same constants that
// were used during training

// Number of MFCC features to use
const N_FEATURES = 26;

// Size of the context window used for producing timesteps in the input vector
const N_CONTEXT = 9;

export class DeepSpeechWorker {
	private dsModel?: ds.Model;
	private sampleRate?: number;
	private streamPtr?: any;
	private responseTask: DelayedTask<void>;
	private initialized = false;
	
	/** Configures and initializes this worker. */
	public initialize(params: DsInitializeRequest) {
		this.dsModel = new ds.Model(params.model, N_FEATURES, N_CONTEXT, params.alphabet, BEAM_WIDTH);
		this.sampleRate = params.sampleRate;
		this.responseTask = new DelayedTask(() => {
			LOG.trace("Fetching stt inside response task");
			const stt = this.nextStt();
			LOG.info("Heard '{}'", stt);
			// TODO: Keyphrase detection and output feeding
		}, params.responseDelay);
		this.initialized = true;
	}
	
	/** Feeds streaming audio input to this worker. */
	public feedAudio(data: any): void {
		if (this.streamPtr) {
			LOG.trace("Receiving audio data, feeding into inference...");
			this.dsModel.feedAudioContent(this.streamPtr, data);
			LOG.trace("Done feeding into inference, restarting response task...");
			this.responseTask.restart(null);
		} else {
			LOG.warn("Receiving audio data while no inference stream pointer is present");
		}
	}
	
	/**
	 * Ends the current streaming inference, fetches
	 * the speech-to-text result (which is returned)
	 * and starts a new stream.
	 */
	private nextStt(): string {
		this.ensureInitializedBefore("ending streaming inference");
		const stt = this.endStreamingInference();
		LOG.debug("Fetched speech-to-text result");
		this.startStreamingInference();
		return stt;
	}
	
	private startStreamingInference(): void {
		this.ensureInitializedBefore("starting streaming inference");
		LOG.debug("(Re)starting streaming inference");
		// Begins streaming inference and stores
		// an opaque (native) pointer to the stream
		this.streamPtr = this.dsModel.setupStream(0, this.sampleRate);
	}
	
	private endStreamingInference(): string | null {
		if (this.streamPtr) {
			LOG.debug("Ending streaming inference");
			return this.dsModel.finishStream(this.streamPtr);
		} else {
			return null;
		}
	}
	
	private ensureInitializedBefore(doingSth: string): void {
		if (!this.initialized) {
			throw new Error("DeepSpeech model was not initialized before " + doingSth);
		}
	}
	
	public start(): void {
		this.ensureInitializedBefore("starting the DeepSpeech worker");
		LOG.info("Starting DeepSpeechWorker (input and streaming inference)...");
		this.startStreamingInference();
	}
	
	public stop(): void {
		// TODO
	}
}
