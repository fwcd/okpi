import { Skill } from "../Skill";
import { Intent } from "../Intent";
import { OutputFacade } from "../../output/facade/OutputFacade";

/**
 * A calculator skill performing basic arithmetic.
 */
export class CalculatorSkill implements Skill {
	private binaryOperations: { [name: string]: (a: number, b: number) => number; } = {
		"plus": (a, b) => a + b,
		"minus": (a, b) => a - b,
		"times": (a, b) => a * b,
		"divided? (?:by)?": (a, b) => a / b,
		"modulo": (a, b) => a % b,
		"to the power of": (a, b) => Math.pow(a, b)
	};
	private utterances: string[] = Object.keys(this.binaryOperations)
		.map(key => "{a} <" + key + "> {b}");
	
	public invoke(intent: Intent, out: OutputFacade): void {
		const a = parseInt(intent.getSlot("a"));
		const b = parseInt(intent.getSlot("b"));
		
		// TODO: Error handling
		
		out.output(this.binaryOperations[]);
	}
	
	public getUtterances(): string[] { return this.utterances; }
}
