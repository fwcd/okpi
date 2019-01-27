export interface SpeechRecognitionEngine {
	setHotwords(...hotwords: string[]): void;
	
	getHotwords(): string[];
	
	start(): void;
	
	stop(): void;
}
