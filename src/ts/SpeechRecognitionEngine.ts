import { Listener } from "./utils/ListenerList";

export interface SpeechRecognitionEngine {
	setHotword(hotword: string): void;
	
	getHotword(): string;
	
	addUtteranceListener(listener: Listener<string>): void;
	
	removeUtteranceListener(listener: Listener<string>): void;
}
