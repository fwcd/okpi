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
