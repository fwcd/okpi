import { Listener } from "../utils/ListenerList";

export interface SpeechRecognitionEngine {
	setHotword(hotword: string): void;
	
	getHotword(): string;
	
	start(): void;
	
	stop(): void;
	
	addUtteranceListener(listener: Listener<string>): void;
	
	removeUtteranceListener(listener: Listener<string>): void;
}
