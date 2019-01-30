// Incomplete type definitions for
// https://github.com/mozilla/DeepSpeech
// Sources: https://github.com/mozilla/DeepSpeech/blob/master/native_client/javascript/index.js
//          https://github.com/mozilla/DeepSpeech/blob/master/native_client/deepspeech.h

declare module "deepspeech" {
	export class Model {
		constructor(modelPath: string, numberOfCepstrum: number, nContext: number, alphabetConfigPath: string, beamWidth: number);
		
		enableDecoderWithLM(alphabetConfigPath: string, lmPath: string, triePath: string, lmAlpha: number, lmBeta: number): number;
		
		stt(buffer: Buffer, sampleRate: number): string;
		
		setupStream(preAllocFrames: number, sampleRate: number): any;
		
		feedAudioContext(buffer: Buffer): void;
		
		intermediateDecode(): string;
		
		finishStream(): string;
	}
	
	export function audioToInputVector(): any;
	
	export function printVersions(): any;
}
