import { DeepSpeechWorker } from "./DeepSpeechWorker";
import { DsWorkerMessage, DsFeedRequest, DsInitializeRequest } from "./DeepSpeechWorkerProtocol";
import { parentPort, isMainThread } from "worker_threads";
import { DeepSpeechWorkerOutput } from "./DeepSpeechWorkerOutput";

function workerMain(): void {
	const worker = new DeepSpeechWorker(new DeepSpeechWorkerOutput(parentPort));
	parentPort.on("message", value => {
		const msg = value as DsWorkerMessage;
		if (msg.msgType === "request") {
			if (msg.name === "feed") {
				worker.feedAudio((msg as DsFeedRequest).audioInputData);
			} else if (msg.name === "start") {
				worker.start();
			} else if (msg.name === "stop") {
				worker.stop();
			} else if (msg.name === "initialize") {
				worker.initialize(msg as DsInitializeRequest);
			}
		}
	});
}

if (!isMainThread) {
	workerMain();
}
