import { Intent } from "./Intent";

/**
 * A simple, "dictionary-like" Intent implementation using a
 * simple object to store key-value-mappings.
 */
export class DictIntent implements Intent {
	private dict: { [key: string]: string; };
	
	public constructor(dict: { [key: string]: string; }) {
		this.dict = dict;
	}
	
	public getSlot(key: string): string {
		return this.dict[key];
	}
}
