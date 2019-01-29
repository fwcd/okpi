/**
 * A facade for various outputs, including
 * simple text output.
 * 
 * TODO: Implement music output, play, pause etc.
 */
export interface OutputFacade {
	output(text: string): void;
}
