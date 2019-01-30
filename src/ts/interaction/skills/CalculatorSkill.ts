import { Skill } from "../Skill";
import { Intent } from "../Intent";
import { OutputFacade } from "../../output/facade/OutputFacade";
import { NLNumberParser } from "../../nlu/NLNumberParser";

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
	private numberParser = new NLNumberParser();
	private utterances: string[] = Object.keys(this.binaryOperations)
		.map(key => "{a} <" + key + "> {b}");
	
	public invoke(intent: Intent, out: OutputFacade): void {
		const a = this.numberParser.parse(intent.getSlot("a"));
		const b = this.numberParser.parse(intent.getSlot("b"));
		const opName = intent.getUtteranceName();
		
		if (a === NaN) {
			out.output("First operand was not a number");
		} else if (b === NaN) {
			out.output("Second operand was not a number");
		} else if (opName in this.binaryOperations) {
			out.output(a + " " + opName + " b equals " + this.binaryOperations[opName](a, b));
		} else {
			out.output("Calculator operation " + opName + " was not recognized");
		}
	}
	
	public getUtterances(): string[] { return this.utterances; }
}
