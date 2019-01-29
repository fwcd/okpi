import * as say from "say";
import { TextOutput } from "./TextOutput";

/**
 * Directly synthesizes speech output from
 * the given text.
 */
export class SpeechOutput implements TextOutput {
	public accept(text: string): void {
		say.speak(text);
	}
}
