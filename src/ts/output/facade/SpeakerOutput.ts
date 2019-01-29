import * as say from "say";
import { OutputFacade } from "./OutputFacade";

/**
 * The "default" implementation of OutputFacade
 * that plays the output as audio through the speakers.
 */
export class SpeakerOutput implements OutputFacade {
	public output(text: string): void {
		say.speak(text);
	}
}
