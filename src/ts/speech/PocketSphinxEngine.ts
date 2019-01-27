import { SpeechRecognitionEngine } from "./SpeechRecognitionEngine";
import { PsDecoder } from "pocketsphinx";
import { Listener } from "../utils/ListenerList";

export class PocketSphinxEngine implements SpeechRecognitionEngine {
	private decoder: PsDecoder;
	private hotword?: string;
	
	public constructor(params: {
		decoder: PsDecoder;
		
	}) {
		this.decoder = params.decoder;
	}
	
	public setHotword(hotword: string): void {
		this.hotword = hotword;
	}
	
	public getHotword(): string {
		return this.hotword;
	}
	
	public addUtteranceListener(listener: Listener<string>): void {
		// TODO
	}
	
	public removeUtteranceListener(listener: Listener<string>): void {
		// TODO
	}
	
	public start(): void {
		// TODO
	}
	
	public stop(): void {
		// TODO
	}
}
