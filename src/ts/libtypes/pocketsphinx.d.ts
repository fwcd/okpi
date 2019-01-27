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
	
	export interface PsConfig {
		setString(arg: string, value: string): void;
	}
	
	export interface PsDecoder {
		loadDict(fdict: string, ffilter: string, format: string): void;
		
		saveDict(dictfile: string, format: string): void;
		
		addWord(word: string, phones: string, update: number): void;
		
		lookupWord(word: string): string;
		
		getLattice(): PsLattice;
		
		getConfig(): PsConfig;
		
		startStream(): void;
		
		startUtt(): void;
		
		endUtt(): void;
		
		processRaw(data: any, noSeach: boolean, fullUtt: boolean): number;
		
		hyp(): PsHypothesis;
		
		getFe(): PsFrontEnd;
		
		getFeat(): PsFeature;
		
		getInSpeech(): boolean;
		
		getFsg(name: string): PsFsgModel;
		
		setFsg(name: string, fsg: PsFsgModel): void;
		
		setJsgfFile(name: string, filePath: string): void;
		
		setJsgfString(name: string, jsgfString: string): void;
		
		getKws(name: string): string;
		
		setKws(name: string, keyfile: string): void;
		
		setKeyphrase(name: string, keyphrase: string): void;
		
		setAllphoneFile(name: string, lmfile: string): void;
		
		getLm(name: string): PsNGramModel;
		
		setLm(name: string, lm: PsNGramModel): void;
		
		setLmFile(name: string, filePath: string): void;
		
		getLogmath(): PsLogMath;
		
		setSearch(searchName: string): void;
		
		unsetSearch(searchName: string): void;
		
		getSearch(): string;
		
		nFrames(): number;
		
		seg(): PsSegmentList;
		
		nbest(): PsSegmentList;
	}
	
	export interface PsLattice {
		
	}
	
	export interface PsHypothesis {
		
	}
	
	export interface PsFrontEnd {
		
	}
	
	export interface PsFeature {
		
	}
	
	export interface PsFsgModel {
		
	}
	
	export interface PsNGramModel {
		
	}
	
	export interface PsLogMath {
		
	}
	
	export interface PsSegmentList extends PsDecoder {}
	
	export interface NBestList extends PsDecoder {}
}
