import { SpeechRecognitionEngine } from "./SpeechRecognitionEngine";
import { TextOutput } from "../output/text/TextOutput";
import * as ds from "deepspeech";

// Source: https://github.com/mozilla/DeepSpeech/blob/master/native_client/javascript/client.js

// These constants control the beam search decoder

// Beam width used in the CTC decoder when building candidate transcriptions
const BEAM_WIDTH = 500;

// The alpha hyperparameter of the CTC decoder. Language Model weight
const LM_ALPHA = 0.75;

// The beta hyperparameter of the CTC decoder. Word insertion bonus.
const LM_BETA = 1.85;

// These constants are tied to the shape of the graph used (changing them changes
// the geometry of the first layer), so make sure you use the same constants that
// were used during training

// Number of MFCC features to use
const N_FEATURES = 26;

// Size of the context window used for producing timesteps in the input vector
const N_CONTEXT = 9;

export class DeepSpeechEngine implements SpeechRecognitionEngine {
	private dsModel: ds.Model;
	
	public constructor(params: {
		model: string,
		alphabet: string,
		lm: string, 
		trie: string
	}) {
		this.dsModel = new ds.Model(params.model, N_FEATURES, N_CONTEXT, params.alphabet, BEAM_WIDTH);
	}
	
	public setUtteranceOutput(output: TextOutput): void {
		// TODO
	}
	
	public setKeyphrase(keyphrase: string): void {
		// TODO
	}
	
	public getKeyphrase(): string {
		// TODO
		return "";
	}
	
	public start(): void {
		// TODO
	}
	
	public stop(): void {
		// TODO
	}
}
