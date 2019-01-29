import { PsDecoder } from "pocketsphinx";
import { AudioInput } from "../input/AudioInput";
import { TextOutput } from "../output/text/TextOutput";
import { DelayedTask } from "../utils/DelayedTask";
import { SpeechRecognitionEngine } from "./SpeechRecognitionEngine";
import { LOG } from "../utils/Logger";

const KEYPHRASE_SEARCH_KEY = "keyphraseSearch";

enum ListenMode {
	UTTERANCE, KEYPHRASE
}

export class PocketSphinxEngine implements SpeechRecognitionEngine {
	private decoder: PsDecoder;
	private keyphrase: string;
	private input: AudioInput;
	private output?: TextOutput;
	private defaultSearchKey: string;
	private listening = false;
	private mode = ListenMode.KEYPHRASE;
	private uttHandleTask: DelayedTask<string>;
	private lastHypstr: string; // The last raw utterance (hypothesis string)
	
	public constructor(params: {
		decoder: PsDecoder;
		input: AudioInput;
		uttResponseTime: number;
	}) {
		this.decoder = params.decoder;
		this.input = params.input;
		this.defaultSearchKey = this.decoder.getSearch();
		this.uttHandleTask = new DelayedTask(input => {
			if (this.output && this.mode == ListenMode.UTTERANCE) {
				// Handle the utterance and listen for the next keyphrase
				LOG.info("Processing utterance '{}'...", input);
				this.output.accept(input);
				this.listenForNextKeyphrase();
			}
		}, params.uttResponseTime);
		
		this.setupListeners();
	}
	
	private setupListeners(): void {
		this.input.addDataListener(data => {
			this.decoder.processRaw(data, false, false);
			const hyp = this.decoder.hyp();
			
			if (hyp != null) {
				const hypstr = hyp.hypstr; // The utterance (hypothesis string)
				
				if (hypstr !== this.lastHypstr) {
					// User has said something new
					
					switch (this.mode) {
						case ListenMode.KEYPHRASE: {
							// Heard the keyphrase
							LOG.info("Heard keyphrase '{}', listening for utterance...", hypstr);
							this.listenForNextUtterance();
							break;
						};
						case ListenMode.UTTERANCE: {
							// Heard an utterance while in utterance mode
							LOG.info("Heard utterance '{}'...", hypstr);
							
							// Wait for the user to complete his utterance
							// by resetting the task timeout each time he speaks
							this.uttHandleTask.restart(hypstr);
							break;
						};
					}
				}
				
				this.lastHypstr = hypstr;
			}
		});
	}
	
	private listenForNextKeyphrase(): void {
		this.endUtt();
		this.decoder.setSearch(KEYPHRASE_SEARCH_KEY);
		this.mode = ListenMode.KEYPHRASE;
		this.startUtt();
	}
	
	private listenForNextUtterance(): void {
		this.endUtt();
		this.decoder.setSearch(this.defaultSearchKey);
		this.mode = ListenMode.UTTERANCE;
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
	
	public setUtteranceOutput(output: TextOutput): void {
		this.output = output;
	}
	
	public getKeyphrase(): string {
		return this.keyphrase;
	}
	
	public start(): void {
		this.input.start();
		this.listenForNextKeyphrase();
	}
	
	public stop(): void {
		this.input.stop();
		this.endUtt();
	}
}
