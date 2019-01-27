export interface SpeechRecognitionEngine {
	setHotword(hotword: string): void;
	
	getHotword(): string;
	
	start(): void;
	
	stop(): void;
}
