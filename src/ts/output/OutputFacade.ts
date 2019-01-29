/**
 * A facade for various outputs, including
 * simple text output.
 */
export interface OutputFacade {
	output(text: string): void;
}
