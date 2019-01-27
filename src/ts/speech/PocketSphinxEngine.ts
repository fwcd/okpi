import { PsDecoder } from "pocketsphinx";
import { RawAudioInput } from "./input/RawAudioInput";
import { TextOutput } from "./output/TextOutput";
import { SpeechRecognitionEngine } from "./SpeechRecognitionEngine";

const KEYPHRASE_SEARCH = "keyphraseSearch";

export class PocketSphinxEngine implements SpeechRecognitionEngine {
	private decoder: PsDecoder;
	private hotword: string;
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
				console.log("Heard '" + hypstr + "' (including hotword), restarting search...");
				// this.output.accept(hypstr); TODO!
				this.nextUtt();
			}
		});
	}
	
	private nextUtt(): void {
		this.decoder.endUtt();
		this.decoder.startUtt();
	}
	
	public setHotword(hotword: string): void {
		this.hotword = hotword;
		this.decoder.setKeyphrase(KEYPHRASE_SEARCH, hotword);
		this.decoder.setSearch(hotword)
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
