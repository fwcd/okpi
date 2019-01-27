export interface SpeechRecognitionEngine {
	setKeyphrase(keyphrase: string): void;
	
	getKeyphrase(): string;
	
	start(): void;
	
	stop(): void;
}
