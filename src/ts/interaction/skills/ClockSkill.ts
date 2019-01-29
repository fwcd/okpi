import { Skill } from "../Skill";
import { Intent } from "../Intent";
import { OutputFacade } from "../../output/facade/OutputFacade";

/**
 * A simple skill telling the current time.
 */
export class ClockSkill implements Skill {
	private utterances: string[] = [
		"what time .*"
	];
	
	public invoke(intent: Intent, out: OutputFacade): void {
		const now = new Date();
		out.output("the time is " + now.getHours() + " " + now.getMinutes());
	}
	
	public getUtterances(): string[] { return this.utterances; }
}
