import { Skill } from "../interaction/Skill";
import { ClockSkill } from "../interaction/skills/ClockSkill";

/**
 * Processes the (natural language) user input,
 * transforms it into an Intent and passes it
 * to the appropriate Skill.
 */
export class UtteranceProcessor {
	private skills: Skill[] = [
		// Register default skills
		new ClockSkill()
	];
}
