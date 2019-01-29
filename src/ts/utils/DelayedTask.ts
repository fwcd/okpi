/**
 * A runnable task that can be rescheduled.
 * At each invocation of `restart`, the task
 * is delayed by a certain amount of milliseconds,
 * until it finally runs once the time has passed.
 */
export class DelayedTask<T> {
	private task: (input: T) => void;
	private minimumMs: number;
	private timeoutHandle?: any;
	
	public constructor(task: (input: T) => void, minimumMs: number) {
		this.task = task;
		this.minimumMs = minimumMs;
	}
	
	public restart(input: T): void {
		if (this.timeoutHandle) {
			window.clearTimeout(this.timeoutHandle);
		}
		this.timeoutHandle = window.setTimeout(() => this.task(input), this.minimumMs);
	}
}
