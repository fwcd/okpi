import { TextOutput } from "../output/text/TextOutput";

export interface SpeechRecognitionEngine {
	setOutput(output: TextOutput): void;
	
	setKeyphrase(keyphrase: string): void;
	
	getKeyphrase(): string;
	
	start(): void;
	
	stop(): void;
}
