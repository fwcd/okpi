import * as path from "path";
import * as child_process from "child_process";
import { SpeechRecognitionEngine } from "./SpeechRecognitionEngine";
import { TextOutput } from "../output/text/TextOutput";
import { AudioInput } from "../input/AudioInput";
import { LOG } from "../utils/Logger";
import { DsWorkerMessage, DsStartRequest, DsStopRequest, DsFeedRequest, DsInitializeRequest } from "./DeepSpeechWorkerProtocol";

export class DeepSpeechEngine implements SpeechRecognitionEngine {
	private input: AudioInput;
	private worker: child_process.ChildProcess;
	
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
		this.input = params.input;
		this.worker = child_process.fork(path.join(__dirname, "DeepSpeechWorkerScript.js"));
		this.setupListeners();
		this.send({
			msgType: "request",
			name: "initialize",
			model: params.model,
			alphabet: params.alphabet,
			responseDelay: params.responseDelay,
			sampleRate: params.sampleRate
		} as DsInitializeRequest);
	}
	
	private setupListeners(): void {
		LOG.debug("Registering DeepSpeechEngine listeners...");
		this.worker.on("message", value => {
			// Receives a message from the worker
			const msg = value as DsWorkerMessage;
			if (msg.msgType === "event") {
				// TODO: Handle events from the worker
			}
		});
		this.input.addDataListener(data => {
			this.send({
				msgType: "request",
				name: "feed",
				audioInputData: data
			} as DsFeedRequest);
		});
	}
	
	/** Sends a message to the worker. */
	private send(msg: DsWorkerMessage): void {
		this.worker.send(msg);
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
	
	public start(): void {
		LOG.info("Starting DeepSpeechEngine...");
		this.input.start();
		this.send({
			name: "start",
			msgType: "request"
		} as DsStartRequest);
	}
	
	public stop(): void {
		this.send({
			name: "stop",
			msgType: "request"
		} as DsStopRequest);
	}
}
