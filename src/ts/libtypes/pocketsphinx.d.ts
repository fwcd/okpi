// Incomplete type definitions for
// https://github.com/cmusphinx/node-pocketsphinx
// Sources: https://github.com/cmusphinx/pocketsphinx/blob/master/swig/pocketsphinx.i
//          https://github.com/cmusphinx/pocketsphinx/blob/master/swig/ps_decoder.i
//          https://github.com/cmusphinx/pocketsphinx/blob/master/swig/ps_lattice.i

declare module "pocketsphinx" {
	export const ps: {
		Decoder: {
			defaultConfig: {
				new(): PsConfig;
			},
			
			fileConfig: {
				new(filePath: string): PsConfig;
			},
			
			new(config: PsConfig): PsDecoder;
		},
		Lattice: {
			new(): PsLattice;
		}
	};
	
	export const sb: {
		
	};
	
	interface PsConfig {
		setString(arg: string, value: string): void;
	}
	
	interface PsDecoder {
		loadDict(fdict: string, ffilter: string, format: string): void;
		
		saveDict(dictfile: string, format: string): void;
		
		addWord(word: string, phones: string, update: number): void;
		
		lookupWord(word: string): string;
		
		getLattice(): PsLattice;
		
		getConfig(): PsConfig;
		
		startStream(): void;
		
		startUtt(): void;
		
		endUtt(): void;
	}
	
	interface PsLattice {
		
	}
}
