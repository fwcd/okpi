/**
 * A flag that determines whether (audio) input
 * should be read or not (thus "locking" the input).
 */
export class InputLock {
	private inputEnabled = true;
	
	public setInputEnabled(inputEnabled: boolean): void { this.inputEnabled = inputEnabled; }
	
	public isInputEnabled(): boolean { return this.inputEnabled; }
}
