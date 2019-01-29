export function strContains(base: string, pattern: string, ignoreCase: boolean): boolean {
	if (ignoreCase) {
		return base.toLowerCase().indexOf(pattern.toLowerCase()) >= 0;
	} else {
		return base.indexOf(pattern) >= 0;
	}
}

export function strContainsAny(base: string, patterns: string[], ignoreCase: boolean): boolean {
	for (let i = 0; i < patterns.length; i++) {
		if (strContains(base, patterns[i], ignoreCase)) {
			return true;
		}
	}
	return false;
}

export function escapeRegex(literal: string): string {
	// Source: https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	return literal.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
