import { Intent } from "./Intent";
import { OutputFacade } from "../output/OutputFacade";

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
	 * curly braces.
	 */
	getUtterances(): string[];
}
