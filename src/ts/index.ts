import * as fs from "fs";
import * as path from "path";
import { ps } from "pocketsphinx";
import { OkPiAssistant } from "./assistant/OkPiAssistant";
import { SpeechAssistant } from "./assistant/SpeechAssistant";
import { ClockSkill } from "./interaction/skills/ClockSkill";
import { MicrophoneInput } from "./input/MicrophoneInput";
import { PocketSphinxEngine } from "./speech/PocketSphinxEngine";
import { SpeakerOutput } from "./output/facade/SpeakerOutput";
import { InputLock } from "./input/InputLock";
import { LOG, LogLevel } from "./utils/Logger";

// Source: https://github.com/cmusphinx/node-pocketsphinx#example

function main(): void {
	LOG.level = LogLevel.DEBUG;
	
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
	
	const inputLock = new InputLock();
	const assistant: SpeechAssistant = new OkPiAssistant({
		engine: new PocketSphinxEngine({
			decoder: new ps.Decoder(config),
			input: new MicrophoneInput({
				debug: false,
				lock: inputLock
			}),
			uttResponseTime: 1000 // ms
		}),
		keyphrase: "ok pi",
		output: new SpeakerOutput(inputLock)
	});
	
	assistant.registerSkills(
		// Register default skills
		new ClockSkill()
	);
	
	assistant.launch();
}

main();
