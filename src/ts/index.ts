import * as fs from "fs";
import * as path from "path";
import * as say from "say";
import { ps } from "pocketsphinx";

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
	const decoder = new ps.Decoder(config);
	
	fs.readFile(path.resolve(psRepo, "test", "data", "goforward.raw"), (err, data) => {
		if (err) console.log(err);
		
		decoder.startUtt();
		decoder.processRaw(data, false, false);
		decoder.endUtt();
		say.speak(decoder.hyp().hypstr);
	});
}

main();
