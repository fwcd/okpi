declare namespace Mic {
	interface MicrophoneOptions {
		endian?: string;
		bitwidth?: number;
		encoding?: string;
		rate?: number;
		channels?: number;
		device?: string;
		exitOnSilence?: number;
		fileType?: string;
		debug?: boolean;
	}
	
	interface Microphone<S> {
		start(): void;
		
		stop(): void;
		
		pause(): void;
		
		resume(): void;
		
		getAudioStream(): S;
	}
}

declare module "mic" {
	import { Transform } from "stream";
	
	function mic(options: Mic.MicrophoneOptions): Mic.Microphone<Transform>;
	
	export = mic;
}
