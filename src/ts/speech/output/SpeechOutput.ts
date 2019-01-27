import * as say from "say";
import { TextOutput } from "./TextOutput";

export class SpeechOutput implements TextOutput {
	public accept(text: string): void {
		say.speak(text);
	}
}
