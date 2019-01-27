import mic, { Microphone, MicrophoneOptions } from "mic";
import { RawAudioInput } from "./RawAudioInput";
import { ListenerList, Listener } from "../../utils/ListenerList";

export class MicrophoneInput implements RawAudioInput {
	private microphone: Microphone;
	private dataListeners = new ListenerList<any>();
	
	public constructor(options: MicrophoneOptions) {
		this.microphone = mic(options);
		this.microphone.getAudioStream().on("data", data => {
			this.dataListeners.fire(data);
		});
	}
	
	public start(): void {
		this.microphone.start();
	}
	
	public stop(): void {
		this.microphone.stop();
	}
	
	public addDataListener(listener: Listener<any>): void {
		this.dataListeners.add(listener);
	}
	
	public removeDataListener(listener: Listener<any>): void {
		this.dataListeners.remove(listener);
	}
}
