import { Skill } from "../interaction/Skill";

export interface SpeechAssistant {
	launch(): void;
	
	registerSkills(...skills: Skill[]): void;
	
	unregisterSkills(...skills: Skill[]): void;
	
	setKeyphrase(keyphrase: string): void;
}
