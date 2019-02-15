import { MessagePort } from "worker_threads";
import { TextOutput } from "../output/text/TextOutput";
import { DsOutputEvent } from "./DeepSpeechWorkerProtocol";

/**
 * Transmits text using the worker protocol.
 */
export class DeepSpeechWorkerOutput implements TextOutput {
	private port: MessagePort;
	
	public constructor(port: MessagePort) {
		this.port = port;
	}
	
	public accept(text: string): void {
		this.port.postMessage({
			msgType: "event",
			name: "output",
			text: text
		} as DsOutputEvent);
	}
}
