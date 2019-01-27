import { PsDecoder } from "pocketsphinx";
import { RawAudioInput } from "./input/RawAudioInput";
import { TextOutput } from "./output/TextOutput";
import { SpeechRecognitionEngine } from "./SpeechRecognitionEngine";
import { strContains } from "../utils/StringUtils";

export class PocketSphinxEngine implements SpeechRecognitionEngine {
	private decoder: PsDecoder;
	private hotword?: string;
	private input: RawAudioInput;
	private output: TextOutput;
	private listeningForUtt = false;
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
			const hyp = this.decoder.hyp();
			
			if (hyp != null) {
				const hypstr = hyp.hypstr; // The utterance
				
				if (this.listeningForUtt) {
					// Listening for rest of utterance
					
					console.log("Heard '" + hypstr + "' while listening for utterance."); // TODO: Implement proper logging
					this.output.accept(hypstr);
					
					this.listeningForUtt = false; // TODO: Implement a timeout here to listen for multiple words
				} else if (strContains(hypstr, this.hotword)) {
					// Heard the hotword
					
					console.log("Heard hotword '" + this.hotword + "', now listening for utterance...");
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
				console.log("User timeout after " + this.timeoutMs + " ms: Could not hear any utterances!");
				this.listeningForUtt = false;
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
