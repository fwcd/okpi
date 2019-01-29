import { Skill } from "../interaction/Skill";
import { TextOutput } from "../speech/output/TextOutput";

/**
 * Processes the (natural language) user input,
 * transforms it into an Intent and passes it
 * to the appropriate Skill.
 */
export class UtteranceProcessor implements TextOutput {
	private skills: Skill[] = [];
	
	public accept(text: string): void {
		
	}
	
	public register(skill: Skill): void {
		this.skills.push(skill);
	}
	
	public unregister(skill: Skill): void {
		this.skills.splice(this.skills.indexOf(skill), 1);
	}
}
