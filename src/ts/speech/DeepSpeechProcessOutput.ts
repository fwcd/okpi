import { MessagePort } from "worker_threads";
import { TextOutput } from "../output/text/TextOutput";
import { DsOutputEvent } from "./DeepSpeechWorkerProtocol";

/**
 * Transmits text using the worker protocol.
 */
export class DeepSpeechProcessOutput implements TextOutput {
	public accept(text: string): void {
		process.send({
			msgType: "event",
			name: "output",
			text: text
		} as DsOutputEvent);
	}
}
