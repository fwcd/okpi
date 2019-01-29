import { Intent } from "./Intent";
import { OutputFacade } from "../output/facade/OutputFacade";

/**
 * A skill is a module that provides a
 * response to the user.
 */
export interface Skill {
	invoke(intent: Intent, out: OutputFacade): void;
	
	/**
	 * Provides a list of template utterances
	 * to match with, for example:
	 * 
	 * `set a timer for {minutes} minutes`
	 * 
	 * Parameter placeholders are enclosed in
	 * curly braces. Additionally, the usual
	 * regex syntax can be used (which implies
	 * that any regex characters have to be
	 * escaped too). Optionally, angle brackets
	 * may be used to identify the single utterances
	 * when processing the intent:
	 * 
	 * `{a} <plus> {b}`
	 * 
	 * The text inside the angle brackets is matched
	 * as if it was a literal, but the text is captured
	 * in the intent.
	 */
	getUtterances(): string[];
}
