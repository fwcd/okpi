export function strContains(base: string, pattern: string): boolean {
	return base.indexOf(pattern) >= 0;
}

export function strContainsAny(base: string, patterns: string[]): boolean {
	patterns.forEach(it => {
		if (strContains(base, it)) {
			return true;
		}
	});
	return false;
}
