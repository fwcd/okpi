import { AudioInput } from "./AudioInput";
import { ListenerList, Listener } from "../utils/ListenerList";
import { Transform } from "stream";
import mic = require("mic");
import { InputLock } from "./InputLock";
import { LOG } from "../utils/Logger";

interface MicrophoneInputParams extends Mic.MicrophoneOptions {
	lock?: InputLock;
}

/**
 * Streams raw audio input from a microphone.
 */
export class MicrophoneInput implements AudioInput {
	private microphone: Mic.Microphone<Transform>;
	private lock?: InputLock;
	private dataListeners = new ListenerList<any>();
	
	public constructor(params: MicrophoneInputParams) {
		this.lock = params.lock;
		this.microphone = mic(params);
		this.microphone.getAudioStream().on("audioProcessExitComplete", () => {
			LOG.info("Exiting microphone stream");
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
