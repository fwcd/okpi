import { PsDecoder } from "pocketsphinx";
import { RawAudioInput } from "./input/RawAudioInput";
import { TextOutput } from "./output/TextOutput";
import { SpeechRecognitionEngine } from "./SpeechRecognitionEngine";

export class PocketSphinxEngine implements SpeechRecognitionEngine {
	private decoder: PsDecoder;
	private hotword?: string;
	private output: TextOutput;
	
	public constructor(params: {
		decoder: PsDecoder;
		input: RawAudioInput;
		output: TextOutput;
	}) {
		this.decoder = params.decoder;
		this.output = params.output;
	}
	
	public setHotword(hotword: string): void {
		this.hotword = hotword;
	}
	
	public getHotword(): string {
		return this.hotword;
	}
	
	public start(): void {
		// TODO
	}
	
	public stop(): void {
		// TODO
	}
}
