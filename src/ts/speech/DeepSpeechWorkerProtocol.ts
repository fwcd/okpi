export interface DsWorkerMessage {
	msgType: "request" | "event";
	name: string;
}

export interface DsRequest extends DsWorkerMessage {
	msgType: "request";
}

export interface DsInitializeRequest extends DsRequest {
	name: "initialize";
	model: string;
	alphabet: string;
	responseDelay: number;
	sampleRate: number;
}

export interface DsStartRequest extends DsRequest {
	name: "start";
}

export interface DsStopRequest extends DsRequest {
	name: "stop";
}

export interface DsFeedRequest extends DsRequest {
	name: "feed";
	audioInputData: any;
}

export interface DsEvent extends DsWorkerMessage {
	msgType: "event";
}
