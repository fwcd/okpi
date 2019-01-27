declare module "mic" {
	import { Transform } from "stream";
	
	function mic(options: MicrophoneOptions): Microphone;
	
	export interface MicrophoneOptions {
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
	
	export interface Microphone {
		start(): void;
		
		stop(): void;
		
		pause(): void;
		
		resume(): void;
		
		getAudioStream(): Transform;
	}
	
	export default mic;
}
