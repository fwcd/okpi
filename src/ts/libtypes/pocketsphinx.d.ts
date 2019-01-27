// Incomplete type definitions for
// https://github.com/cmusphinx/node-pocketsphinx
// Sources: https://github.com/cmusphinx/pocketsphinx/blob/master/swig/pocketsphinx.i
//          https://github.com/cmusphinx/pocketsphinx/blob/master/swig/ps_decoder.i
//          https://github.com/cmusphinx/pocketsphinx/blob/master/swig/ps_lattice.i
// TODO:    https://github.com/cmusphinx/sphinxbase/blob/master/swig/sphinxbase.i

declare module "pocketsphinx" {
	export const ps: {
		Decoder: {
			defaultConfig: {
				new(): PsConfig;
			};
			
			fileConfig: {
				new(filePath: string): PsConfig;
			};
			
			new(config: PsConfig): PsDecoder;
		};
		
		Lattice: {
			new(filePath: string): PsLattice;
			
			new(decoder: PsDecoder, filePath: string): PsLattice;
		};
		
		Hypothesis: {
			new(hypstr: string, bestScore: number, prob: number): PsHypothesis;
		};
		
		Segment: {
			fromIter(iter: any): PsSegment;
		};
		
		NBest: {
			fromIter(iter: any): PsSegment;
		};
	};
	
	export const sb: {
		FrontEnd: {
			new(): PsFrontEnd;
		};
		
		NGramModel: {
			fromIter(iter: any): PsNGramModel;
			
			new(filePath: string): PsNGramModel;
			
			new(config: PsConfig, logmath: PsLogMath, filePath: string): PsNGramModel;
		};
		
		NGramModelSet: {
			new(config: PsConfig, logmath: PsLogMath, filePath: string): PsNGramModelSet;
		};
		
		LogMath: {
			new(): PsLogMath;
		};
		
		Jsgf: {
			new(filePath: string): PsJsgf;
		};
	};
	
	export interface PsConfig {
		setString(key: string, value: string): void;
		
		setBoolean(key: string, value: boolean): void;
		
		setInt(key: string, value: number): void;
		
		setFloat(key: string, value: number): void;
		
		setStringExtra(key: string, value: string): void;
		
		exists(key: string): boolean;
		
		getBoolean(key: string): boolean;
		
		getInt(key: string): number;
		
		getFloat(key: string): number;
		
		getString(key: string): string;
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
		write(filePath: string): void;
		
		writeHtk(filePath: string): void;
	}
	
	export interface PsHypothesis {
		hypstr: string;
		bestScore: number;
		prob: number;
	}
	
	export interface PsFrontEnd {
		outputSize(): number;
		
		processUtt(spch: string, nsamps: number, cepBlock: any): number;
	}
	
	export interface PsFeature {
		
	}
	
	export interface PsFsgModel {
		
	}
	
	export interface PsNGramModel {
		write(filePath: string, ftype: number): void;
		
		strToType(str: string): number;
		
		typeToStr(type: number): string;
		
		casefold(kase: number): void;
		
		size(): number;
		
		addWord(word: string, weight: number): number;
		
		prob(n: number, ptr: any): number;
	}
	
	export interface PsNGramModelSet extends PsIterable<PsNGramModel> {
		count(): number;
		
		add(model: PsNGramModel, name: string, weight: number, reuseWidmap: boolean): PsNGramModel;
		
		select(name: string): PsNGramModel;
		
		lookup(name: string): PsNGramModel;
		
		current(): string;
	}
	
	export interface PsJsgfRule {
		
	}
	
	export interface PsJsgf extends PsIterable<PsJsgfRule> {
		getName(): string;
		
		getRule(name: string): PsJsgfRule;
		
		buildFsg(rule: PsJsgfRule, logmath: PsLogMath, lw: number): PsFsgModel;
	}
	
	export interface PsLogMath {
		exp(prob: number): number;
	}
	
	export interface PsIterator<T> {
		next(): T | null;
	}
	
	export interface PsIterable<T> {
		iter(): PsIterator<T>;
	}
	
	export interface PsSegment {
		word: string;
		ascore: number;
		lscore: number;
		lback: number;
		prob: number;
		startFrame: number;
		endFrame: number;
	}
	
	export interface PsNBest {
		hypstr: string;
		score: number;
		
		hyp(): PsHypothesis;
	}
	
	export interface PsSegmentList extends PsIterable<PsSegment> {}
	
	export interface PsNBestList extends PsIterable<PsNBest> {}
}
