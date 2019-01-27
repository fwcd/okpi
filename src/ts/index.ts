import * as fs from "fs";
import * as path from "path";
import { ps } from "pocketsphinx";

function main(): void {
	// Source: https://github.com/cmusphinx/node-pocketsphinx#example
	
	// Assuming that the PocketSphinx repository is a sibling directory of "OkPi"
	const psRepo = path.resolve(__dirname, "..", "..", "..", "pocketsphinx");
	
	if (!fs.existsSync(psRepo)) {
		throw new Error("Could not find 'pocketsphinx' directory in the superdirectory of 'OkPi'. Try cloning it from GitHub: https://github.com/cmusphinx/pocketsphinx");
	}
	
	const modelDir = path.resolve(psRepo, "model", "en-us");
	const config = new ps.Decoder.defaultConfig();
	config.setString("-hmm", modelDir + "en-us");
	config.setString("-dict", modelDir + "cmudict-en-us.dict");
	config.setString("-lm", modelDir + "en-us.lm.bin");
	const decoder = new ps.Decoder(config);
	
	fs.readFile(path.resolve(psRepo, "test", "data", "goforward.raw"), (err, data) => {
		if (err) console.log(err);
		
		decoder.startUtt();
		decoder.processRaw(data, false, false);
		decoder.endUtt();
		console.log(decoder.hyp());
	});
}

main();
