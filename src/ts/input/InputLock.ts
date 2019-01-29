/**
 * A flag that determines whether (audio) input
 * should be read or not (thus "locking" the input).
 */
export class InputLock {
	private locked = false;
	
	public setLocked(locked: boolean): void { this.locked = locked; }
	
	public isLocked(): boolean { return this.locked; }
}
