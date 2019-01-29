import { SpeechAssistant } from "./SpeechAssistant";
import { SpeechRecognitionEngine } from "../speech/SpeechRecognitionEngine";

/**
 * The default speech assistant built for this project.
 */
export class OkPiAssistant implements SpeechAssistant {
	private engine: SpeechRecognitionEngine;
	
	public constructor(engine: SpeechRecognitionEngine) {
		this.engine = engine;
	}
	
	public launch(): void {
		this.engine.start();
	}
}
