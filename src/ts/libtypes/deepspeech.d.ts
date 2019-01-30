// Incomplete type definitions for
// https://github.com/mozilla/DeepSpeech
// Sources: https://github.com/mozilla/DeepSpeech/blob/master/native_client/javascript/index.js

declare module "deepspeech" {
	export class Model {
		constructor();
		
		enableDecoderWithLM(): any;
		
		stt(): any;
		
		setupStream(): any;
		
		feedAudioContext(): void;
		
		intermediateDecode(): any;
		
		finishStream(): any;
	}
	
	export function audioToInputVector(): any;
	
	export function printVersions(): any;
}
