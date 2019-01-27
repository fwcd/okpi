declare module "mic" {
	import { Transform } from "stream";
	
	function mic(options: {
		endian?: string;
		bitwidth?: number;
		encoding?: string;
		rate?: number;
		channels?: number;
		device?: string;
		exitOnSilence?: number;
		fileType?: string;
		debug?: boolean;
	}): Microphone;
	
	export interface Microphone {
		start(): void;
		
		stop(): void;
		
		pause(): void;
		
		resume(): void;
		
		getAudioStream(): Transform;
	}
	
	export default mic;
}
