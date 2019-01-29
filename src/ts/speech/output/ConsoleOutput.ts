import { TextOutput } from "./TextOutput";

/**
 * Prints the text to the console.
 */
export class ConsoleOutput implements TextOutput {
	public accept(text: string): void {
		console.log(text);
	}
}
