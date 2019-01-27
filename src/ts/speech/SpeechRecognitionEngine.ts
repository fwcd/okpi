export interface SpeechRecognitionEngine {
	setHotwords(...hotword: string[]): void;
	
	getHotwords(): string[];
	
	start(): void;
	
	stop(): void;
}
