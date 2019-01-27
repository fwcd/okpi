import { PsDecoder } from "pocketsphinx";
import { strContainsAny } from "../utils/StringUtils";
import { RawAudioInput } from "./input/RawAudioInput";
import { TextOutput } from "./output/TextOutput";
import { SpeechRecognitionEngine } from "./SpeechRecognitionEngine";

export class PocketSphinxEngine implements SpeechRecognitionEngine {
	private decoder: PsDecoder;
	private hotwords: string[];
	private input: RawAudioInput;
	private output: TextOutput;
	private listeningForUtt = false;
	private uttTimeoutMs: number;
	
	public constructor(params: {
		decoder: PsDecoder;
		input: RawAudioInput;
		output: TextOutput;
		uttTimeoutMs: number;
	}) {
		this.decoder = params.decoder;
		this.input = params.input;
		this.output = params.output;
		this.uttTimeoutMs = params.uttTimeoutMs;
		this.setupListeners();
	}
	
	private setupListeners(): void {
		this.input.addDataListener(data => {
			this.decoder.processRaw(data, false, false);
			const hyp = this.decoder.hyp();
			
			if (hyp != null) {
				const hypstr = hyp.hypstr; // The utterance
				
				if (this.listeningForUtt) {
					// Listening for rest of utterance
					
					console.log("Heard '" + hypstr + "' while listening for utterance."); // TODO: Implement proper logging
					this.output.accept(hypstr);
					
					this.listeningForUtt = false; // TODO: Implement a timeout here to listen for multiple words
				} else if (strContainsAny(hypstr, this.hotwords, true)) {
					// Heard the hotword
					
					console.log("Heard hotword '" + hypstr + "', now listening for utterance...");
					this.listenForUtterance();
				} else {
					// Heard something that did not match the hotword
					
					console.log("Heard '" + hypstr + "' while waiting for hotword");
					
					// TODO: Clear the utterance cache (i.e. call nextUtt()) after a specified interval
				}
			}
		});
	}
	
	private nextUtt(): void {
		this.decoder.endUtt();
		this.decoder.startUtt();
	}
	
	private listenForUtterance(): void {
		this.nextUtt();
		
		this.listeningForUtt = true;
		window.setTimeout(() => {
			if (this.listeningForUtt) {
				console.log("User timeout after " + this.uttTimeoutMs + " ms: Could not hear any utterances!");
				this.listeningForUtt = false;
			}
		}, this.uttTimeoutMs);
	}
	
	public setHotwords(...hotwords: string[]): void {
		this.hotwords = hotwords;
	}
	
	public getHotwords(): string[] {
		return this.hotwords;
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
