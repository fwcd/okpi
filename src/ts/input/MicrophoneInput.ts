import { AudioInput } from "./AudioInput";
import { ListenerList, Listener } from "../utils/ListenerList";
import { Transform } from "stream";
import mic = require("mic");
import { InputLock } from "./InputLock";

/**
 * Streams raw audio input from a microphone.
 */
export class MicrophoneInput implements AudioInput {
	private microphone: Mic.Microphone<Transform>;
	private lock?: InputLock;
	private dataListeners = new ListenerList<any>();
	
	public constructor(options: Mic.MicrophoneOptions) {
		this.microphone = mic(options);
		this.microphone.getAudioStream().on("audioProcessExitComplete", () => {
			console.log("Exiting microphone stream"); // TODO: Logging
		});
		this.microphone.getAudioStream().on("data", data => {
			if (!this.lock || !this.lock.isLocked()) {
				this.dataListeners.fire(data);
			}
		});
	}
	
	public start(): void { this.microphone.start(); }
	
	public stop(): void { this.microphone.stop(); }
	
	public addDataListener(listener: Listener<any>): void { this.dataListeners.add(listener); }
	
	public removeDataListener(listener: Listener<any>): void { this.dataListeners.remove(listener); }
	
	public setLock(lock: InputLock): void { this.lock = lock; }
}
