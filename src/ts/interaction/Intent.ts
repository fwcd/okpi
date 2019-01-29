/**
 * Represents a request by the user.
 */
export interface Intent {
	/**
	 * Fetches the name of this utterance (specified
	 * inside angle brackets among the Skill's utterances).
	 */
	getUtteranceName(): string;
	
	/**
	 * Fetches an argument by key.
	 * 
	 * @param key The parameter
	 */
	getSlot(key: string): string;
}
