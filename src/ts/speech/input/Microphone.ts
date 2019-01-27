import mic from "mic";
import { RawAudioInput } from "./RawAudioInput";

export class Microphone implements RawAudioInput {
	public constructor() {
		const microphone = mic({});
	}
}
