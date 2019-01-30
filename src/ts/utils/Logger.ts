export enum LogLevel {
	DEEP_TRACE = -3,
	TRACE = -2,
	DEBUG = -1,
	INFO = 0,
	WARN = 1,
	ERROR = 2,
	NONE = 100000
}

export const STRING_LOG_LEVELS: { [key: string]: LogLevel; } = {
	"DEEP_TRACE": LogLevel.DEEP_TRACE,
	"TRACE": LogLevel.TRACE,
	"DEBUG": LogLevel.DEBUG,
	"INFO": LogLevel.INFO,
	"WARN": LogLevel.WARN,
	"ERROR": LogLevel.ERROR,
	"NONE": LogLevel.NONE
}

/**
 * Basic logging abstraction supporting
 * different log levels.
 */
export class Logger {
	level: LogLevel;

	public constructor(level: LogLevel) {
		this.level = level;
	}

	/**
	 * Logs a string internally. It should only be called
	 * once through an internal method to display the
	 * caller that originally logged the string.
	 *
	 * @param prefix - An appended prefix
	 * @param msg - The message including placeholders ({} or {:?})
	 * @param insertions - The items that replace their respective placeholders
	 * @param msgLevel - The log level of the message
	 */
	private log(prefix: string, msg: string, insertions: any[], msgLevel: LogLevel): void {
		if (this.uses(msgLevel)) {
			let output = prefix;

			try {
				let charIndex = 0;
				let placeholderIndex = 0;

				while (charIndex < msg.length) {
					let c = msg.charAt(charIndex);

					if (this.substringStartsWith(charIndex, msg, "{}")) {
						// Insert placeholder
						let placeholder: any = insertions[placeholderIndex];
						let placeholderStr: string;
						if (placeholder === undefined) {
							placeholderStr = "undefined";
						} else if (placeholder === null) {
							placeholderStr = "null";
						} else if (typeof placeholder === "function") {
							placeholderStr = placeholder();
						} else {
							placeholderStr = placeholder;
						}
						output += placeholderStr;
						placeholderIndex++;
						charIndex += 2;
					} else if (this.substringStartsWith(charIndex, msg, "{:?}")) {
						// Insert placeholder as JSON
						output += JSON.stringify(insertions[placeholderIndex]);
						placeholderIndex++;
						charIndex += 4;
					} else {
						output += c;
						charIndex++;
					}
				}
			} catch (e) {
				try {
					output = prefix + "Exception while logging: " + e;
				} catch (e2) {
					output = prefix + "Exception while logging (could not be printed).";
				}
			}

			console.log(output);
		}
	}

	private substringStartsWith(substrStartIndex: number, str: string, matched: string): boolean {
		for (let i=0; i<matched.length; i++) {
			if (str.charAt(substrStartIndex + i) !== matched.charAt(i)) {
				return false;
			}
		}
		return true;
	}

	public uses(level: LogLevel) {
		return this.level <= level;
	}

	public deepTrace(msg: string, ...insertions: any[]): void {
		this.log("[DEEP_TRACE] ", msg, insertions, LogLevel.DEEP_TRACE);
	}

	public trace(msg: string, ...insertions: any[]): void {
		this.log("[TRACE]      ", msg, insertions, LogLevel.TRACE);
	}

	public debug(msg: string, ...insertions: any[]): void {
		this.log("[DEBUG]      ", msg, insertions, LogLevel.DEBUG);
	}

	public info(msg: string, ...insertions: any[]): void {
		this.log("[INFO]       ", msg, insertions, LogLevel.INFO);
	}

	public warn(msg: string, ...insertions: any[]): void {
		this.log("[WARN]       ", msg, insertions, LogLevel.WARN);
	}

	public error(msg: string, ...insertions: any[]): void {
		this.log("[ERROR]      ", msg, insertions, LogLevel.ERROR);
	}
}

export const LOG = new Logger(LogLevel.INFO);
