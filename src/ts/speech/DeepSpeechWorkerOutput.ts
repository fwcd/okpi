import { TextOutput } from "../output/text/TextOutput";
import { parentPort } from "worker_threads";
import { DsOutputEvent } from "./DeepSpeechWorkerProtocol";

/**
 * Transmits text using the worker protocol.
 */
export class DeepSpeechWorkerOutput implements TextOutput {
	public accept(text: string): void {
		parentPort.postMessage({
			msgType: "event",
			name: "output",
			text: text
		} as DsOutputEvent);
	}
}
