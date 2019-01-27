import { PsDecoder } from "pocketsphinx";
import { RawAudioInput } from "./input/RawAudioInput";
import { TextOutput } from "./output/TextOutput";
import { SpeechRecognitionEngine } from "./SpeechRecognitionEngine";

export class PocketSphinxEngine implements SpeechRecognitionEngine {
	private decoder: PsDecoder;
	private hotword?: string;
	private input: RawAudioInput;
	private output: TextOutput;
	private listening = false;
	private timeoutMs: number;
	
	public constructor(params: {
		decoder: PsDecoder;
		input: RawAudioInput;
		output: TextOutput;
		timeoutMs: number;
	}) {
		this.decoder = params.decoder;
		this.input = params.input;
		this.output = params.output;
		this.timeoutMs = params.timeoutMs;
		this.setupListeners();
	}
	
	private setupListeners(): void {
		this.input.addDataListener(data => {
			this.decoder.processRaw(data, false, false);
			const hyp = this.decoder.hyp().hypstr;
			
			if (this.listening) {
				// TODO: Implement proper logging
				console.log("Heard " + hyp + " while listening for utterance.");
				this.output.accept(hyp);
				
				// TODO: Implement a timeout here to listen for multiple words
				this.listening = false;
			} else if (hyp === this.hotword) {
				console.log("Heard hotword '" + this.hotword + "', now listening for utterance...");
				this.listenForUtterance();
			}
		});
	}
	
	private listenForUtterance(): void {
		this.listening = true;
		window.setTimeout(() => {
			if (this.listening) {
				console.log("User timeout after " + this.timeoutMs + " ms: Could not hear any utterances!");
				this.listening = false;
			}
		}, this.timeoutMs);
	}
	
	public setHotword(hotword: string): void {
		this.hotword = hotword;
	}
	
	public getHotword(): string {
		return this.hotword;
	}
	
	public start(): void {
		this.input.start();
		this.decoder.startUtt();
	}
	
	public stop(): void {
		this.input.stop();
		this.decoder.endUtt();
	}
}
