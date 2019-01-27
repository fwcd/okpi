import { TextOutput } from "./TextOutput";

export class ConsoleOutput implements TextOutput {
	public accept(text: string): void {
		console.log(text);
	}
}
