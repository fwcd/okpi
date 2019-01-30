import { SpeechRecognitionEngine } from "./SpeechRecognitionEngine";
import { TextOutput } from "../output/text/TextOutput";
import * as ds from "deepspeech";
import { AudioInput } from "../input/AudioInput";
import { DelayedTask } from "../utils/DelayedTask";
import { LOG } from "../utils/Logger";

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

export class DeepSpeechEngine implements SpeechRecognitionEngine {
	private dsModel: ds.Model;
	private input: AudioInput;
	private sampleRate: number;
	private responseTask: DelayedTask<void>;
	private streamPtr?: any;
	
	public constructor(params: {
		model: string;
		alphabet: string;
		lm: string;
		trie: string;
		input: AudioInput;
		responseDelay: number;
		sampleRate: number;
	}) {
		LOG.info("Creating DeepSpeechEngine model...");
		this.dsModel = new ds.Model(params.model, N_FEATURES, N_CONTEXT, params.alphabet, BEAM_WIDTH);
		this.input = params.input;
		this.sampleRate = params.sampleRate;
		this.responseTask = new DelayedTask(() => {
			LOG.trace("Fetching stt inside response task");
			const stt = this.nextStt();
			LOG.info("Heard '{}'", stt);
			// TODO: Keyphrase detection and output feeding
		}, params.responseDelay);
		
		this.setupListeners();
	}
	
	private setupListeners(): void {
		LOG.info("Registering input listeners...");
		this.input.addDataListener(data => {
			if (this.streamPtr) {
				LOG.trace("Receiving audio data, feeding into inference...");
				this.dsModel.feedAudioContent(this.streamPtr, data);
				LOG.trace("Done feeding into inference, restarting response task...");
				this.responseTask.restart(null);
			} else {
				LOG.warn("Receiving audio data while no inference stream pointer is present");
			}
		});
	}
	
	/**
	 * Ends the current streaming inference, fetches
	 * the speech-to-text result (which is returned)
	 * and starts a new stream.
	 */
	private nextStt(): string {
		const stt = this.endStreamingInference();
		LOG.debug("Fetched speech-to-text result");
		this.startStreamingInference();
		return stt;
	}
	
	public setUtteranceOutput(output: TextOutput): void {
		// TODO
	}
	
	public setKeyphrase(keyphrase: string): void {
		// TODO
	}
	
	public getKeyphrase(): string {
		// TODO
		return "";
	}
	
	private startStreamingInference(): void {
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
	
	public start(): void {
		LOG.info("Starting DeepSpeechEngine (input and streaming inference)...");
		this.startStreamingInference();
		this.input.start();
	}
	
	public stop(): void {
		// TODO
	}
}
