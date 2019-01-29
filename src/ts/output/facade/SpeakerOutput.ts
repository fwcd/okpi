import * as say from "say";
import { OutputFacade } from "./OutputFacade";
import { InputLock } from "../../input/InputLock";
import { LOG } from "../../utils/Logger";

/**
 * The "default" implementation of OutputFacade
 * that plays the output as audio through the speakers.
 */
export class SpeakerOutput implements OutputFacade {
	private inputLock?: InputLock;
	
	public constructor(inputLock?: InputLock) {
		this.inputLock = inputLock;
	}
	
	public output(text: string): void {
		this.inputLock.setLocked(true);
		say.speak(text, null, null, err => {
			LOG.error("An error occurred while speaking: {}", err);
			
			// Unlock the input after speaking
			this.inputLock.setLocked(false);
		});
	}
}
