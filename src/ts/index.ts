import * as fs from "fs";
import * as path from "path";
import { ps } from "pocketsphinx";
import { MicrophoneInput } from "./speech/input/MicrophoneInput";
import { SpeechOutput } from "./speech/output/SpeechOutput";
import { PocketSphinxEngine } from "./speech/PocketSphinxEngine";
import { SpeechRecognitionEngine } from "./speech/SpeechRecognitionEngine";

function main(): void {
	// Source: https://github.com/cmusphinx/node-pocketsphinx#example
	
	// Assuming that the PocketSphinx repository is a sibling directory of "OkPi"
	const psRepo = path.resolve(__dirname, "..", "..", "..", "pocketsphinx");
	
	if (!fs.existsSync(psRepo)) {
		throw new Error("Could not find 'pocketsphinx' in the parent directory of 'OkPi'. Try cloning it from GitHub: https://github.com/cmusphinx/pocketsphinx");
	}
	
	const modelDir = path.resolve(psRepo, "model", "en-us");
	const config = new ps.Decoder.defaultConfig();
	config.setString("-hmm", path.resolve(modelDir, "en-us"));
	config.setString("-dict", path.resolve(modelDir, "cmudict-en-us.dict"));
	config.setString("-lm", path.resolve(modelDir, "en-us.lm.bin"));
	
	const engine: SpeechRecognitionEngine = new PocketSphinxEngine({
		decoder: new ps.Decoder(config),
		input: new MicrophoneInput({
			exitOnSilence: 100000000 // TODO
		}),
		output: new SpeechOutput(),
		timeoutMs: 10000 // ms
	});
	
	engine.start();
}

main();
