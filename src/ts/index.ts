import { ps } from "pocketsphinx";
import { OkPiAssistant } from "./assistant/OkPiAssistant";
import { SpeechAssistant } from "./assistant/SpeechAssistant";
import { ClockSkill } from "./interaction/skills/ClockSkill";
import { MicrophoneInput } from "./input/MicrophoneInput";
import { PocketSphinxEngine } from "./speech/PocketSphinxEngine";
import { SpeakerOutput } from "./output/facade/SpeakerOutput";
import { InputLock } from "./input/InputLock";
import { LOG, LogLevel } from "./utils/Logger";
import { ArgumentParser } from "argparse";
import { DeepSpeechEngine } from "./speech/DeepSpeechEngine";

// Source: https://github.com/mozilla/DeepSpeech/blob/master/native_client/javascript/client.js

function main(): void {
	LOG.level = LogLevel.DEBUG;
	
	const parser = new ArgumentParser({
		addHelp: true,
		description: "Virtual assistant using offline voice recognition"
	});
	parser.addArgument(['--model'], { required: true, help: 'Path to the model (protocol buffer binary file)' });
	parser.addArgument(['--alphabet'], { required: true, help: 'Path to the configuration file specifying the alphabet used by the network' });
	parser.addArgument(['--lm'], { help: 'Path to the language model binary file', nargs: '?' });
	parser.addArgument(['--trie'], { help: 'Path to the language model trie file created with native_client/generate_trie', nargs: '?' });
	const args = parser.parseArgs();
	
	const sampleRate = 16000;
	const inputLock = new InputLock();
	const assistant: SpeechAssistant = new OkPiAssistant({
		engine: new DeepSpeechEngine({
			input: new MicrophoneInput({
				debug: false,
				lock: inputLock,
				rate: "" + sampleRate
			}),
			alphabet: args["alphabet"],
			lm: args["lm"],
			trie: args["trie"],
			model: args["model"],
			responseDelay: 3000, // ms
			sampleRate: sampleRate
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
