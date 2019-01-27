import { PsDecoder } from "pocketsphinx";
import { RawAudioInput } from "./input/RawAudioInput";
import { TextOutput } from "./output/TextOutput";
import { SpeechRecognitionEngine } from "./SpeechRecognitionEngine";

const KEYPHRASE_SEARCH_KEY = "keyphraseSearch";

export class PocketSphinxEngine implements SpeechRecognitionEngine {
	private decoder: PsDecoder;
	private keyphrase: string;
	private input: RawAudioInput;
	private output: TextOutput;
	private uttTimeoutMs: number;
	private listening = false;
	
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
				console.log("Heard '" + hypstr + "' (including hotword), restarting search...");
				// this.output.accept(hypstr); TODO!
				this.listenForNextKeyphrase();
			}
		});
	}
	
	private listenForNextKeyphrase(): void {
		this.endUtt();
		this.decoder.setSearch(KEYPHRASE_SEARCH_KEY);
		this.startUtt();
	}
	
	private listenForNextUtterance(): void {
		this.endUtt();
		this.decoder.unsetSearch(KEYPHRASE_SEARCH_KEY);
		this.startUtt();
	}
	
	private startUtt(): void {
		if (!this.listening) {
			this.decoder.startUtt();
			this.listening = true;
		}
	}
	
	private endUtt(): void {
		if (this.listening) {
			this.decoder.endUtt();
			this.listening = false;
		}
	}
	
	public setKeyphrase(keyphrase: string): void {
		this.keyphrase = keyphrase;
		this.decoder.setKeyphrase(KEYPHRASE_SEARCH_KEY, keyphrase);
	}
	
	public getKeyphrase(): string {
		return this.keyphrase;
	}
	
	public start(): void {
		this.input.start();
		this.startUtt();
	}
	
	public stop(): void {
		this.input.stop();
		this.endUtt();
	}
}
