import { SpeechRecognitionEngine } from "./SpeechRecognitionEngine";
import { TextOutput } from "../output/text/TextOutput";

export class DeepSpeechEngine implements SpeechRecognitionEngine {
	public constructor(params: {
		model: string,
		alphabet: string,
		lm: string, 
		trie: string
	}) {
		
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
		// TODO
	}
	
	public stop(): void {
		// TODO
	}
}
