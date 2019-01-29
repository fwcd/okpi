/**
 * Represents a request by the user.
 */
export interface Intent {
	getSlot(key: string): string;
}
