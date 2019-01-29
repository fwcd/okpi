import { SpeechAssistant } from "./SpeechAssistant";
import { SpeechRecognitionEngine } from "../speech/SpeechRecognitionEngine";
import { Skill } from "../interaction/Skill";
import { UtteranceProcessor } from "../nlu/UtteranceProcessor";

/**
 * The default speech assistant built for this project.
 */
export class OkPiAssistant implements SpeechAssistant {
	private engine: SpeechRecognitionEngine;
	private uttProcessor: UtteranceProcessor;
	
	public constructor(params: {
		engine: SpeechRecognitionEngine,
		keyphrase: string
	}) {
		this.uttProcessor = new UtteranceProcessor();
		this.engine = params.engine;
		this.engine.setKeyphrase(params.keyphrase);
		this.engine.setOutput(this.uttProcessor);
	}
	
	public launch(): void {
		this.engine.start();
	}
	
	public registerSkills(...skills: Skill[]): void {
		skills.forEach(skill => this.uttProcessor.register(skill));
	}
	
	public unregisterSkills(...skills: Skill[]): void {
		skills.forEach(skill => this.uttProcessor.unregister(skill));
	}
	
	public setKeyphrase(keyphrase: string): void {
		this.engine.setKeyphrase(keyphrase);
	}
}
