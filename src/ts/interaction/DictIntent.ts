import { Intent } from "./Intent";

/**
 * A simple, "dictionary-like" Intent implementation using a
 * simple object to store key-value-mappings.
 */
export class DictIntent implements Intent {
	private utteranceName: string;
	private dict: { [key: string]: string; };
	
	public constructor(params: {
		dict: { [key: string]: string; },
		utteranceName: string
	}) {
		this.dict = params.dict;
		this.utteranceName = params.utteranceName;
	}
	
	public getSlot(key: string): string {
		return this.dict[key];
	}
	
	public getUtteranceName(): string {
		return this.utteranceName;
	}
}
