import { Intent } from "./Intent";
import { OutputFacade } from "./OutputFacade";

/**
 * A skill is a module that provides a
 * response to the user.
 */
export interface Skill {
	invoke(intent: Intent, out: OutputFacade): void;
}
