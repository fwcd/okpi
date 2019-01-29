/**
 * A runnable task that can be rescheduled.
 * At each invocation of `restart`, the task
 * is delayed by a certain amount of milliseconds,
 * until it finally runs once the time has passed.
 */
export class DelayedTask {
	private task: () => void;
	private minimumMs: number;
	private timeoutHandle?: any;
	
	public constructor(task: () => void, minimumMs: number) {
		this.task = task;
		this.minimumMs = minimumMs;
	}
	
	public restart(): void {
		if (this.timeoutHandle) {
			window.clearTimeout(this.timeoutHandle);
		}
		this.timeoutHandle = window.setTimeout(() => this.task(), this.minimumMs);
	}
}
