/**
 * A natural-language number parser.
 */
export class NLNumberParser {
	private digits = {
		"one": 1,
		"two": 2,
		"three": 3,
		"four": 4,
		"five": 5,
		"six": 6,
		"seven": 7,
		"eight": 8,
		"nine": 9
	};
	
	/**
	 * Parses numbers from written English
	 * to JavaScript.
	 * 
	 * @param nlNumber A number in natural language
	 */
	public parse(nlNumber: string): number {
		if (nlNumber in this.digits) {
			// Parse digit
			return this.digits[nlNumber];
		} else {
			// TODO: Implement more number types
			return NaN;
		}
	}
}
