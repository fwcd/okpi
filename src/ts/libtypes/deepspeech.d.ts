// Incomplete type definitions for
// https://github.com/mozilla/DeepSpeech
// Sources: https://github.com/mozilla/DeepSpeech/blob/master/native_client/javascript/index.js
//          https://github.com/mozilla/DeepSpeech/blob/master/native_client/deepspeech.h

declare module "deepspeech" {
	export class Model {
		/**
		 * An object providing an interface to a trained DeepSpeech model.
		 *
		 * @param modelPath The path to the frozen model graph.
		 * @param nCep The number of cepstrum the model was trained with.
		 * @param nContext The context window the model was trained with.
		 * @param alphabetConfigPath The path to the configuration file specifying
		 *                            the alphabet used by the network. See alphabet.h.
		 * @param beamWidth The beam width used by the decoder. A larger beam
		 *                   width generates better results at the cost of decoding
		 *                   time.
		 *
		 * @returns Zero on success, non-zero on failure.
		 */
		constructor(modelPath: string, nCep: number, nContext: number, alphabetConfigPath: string, beamWidth: number);
		
		/**
		 * Enable decoding using beam scoring with a KenLM language model.
		 *
		 * @param alphabetConfigPath The path to the configuration file specifying
		 *                            the alphabet used by the network. See alphabet.h.
		 * @param lmPath The path to the language model binary file.
		 * @param triePath The path to the trie file build from the same vocabu-
		 *                  lary as the language model binary.
		 * @param lmAlpha The alpha hyperparameter of the CTC decoder. Language Model
						 weight.
		 * @param lmBeta The beta hyperparameter of the CTC decoder. Word insertion
		 				weight.
		 *
		 * @returns Zero on success, non-zero on failure (invalid arguments).
		 */
		enableDecoderWithLM(alphabetConfigPath: string, lmPath: string, triePath: string, lmAlpha: number, lmBeta: number): number;
		
		/**
		 * Use the DeepSpeech model to perform Speech-To-Text.
		 *
		 * @param buffer A 16-bit, mono raw audio signal at the appropriate
		 *                sample rate.
		 * @param sampleRate The sample-rate of the audio signal.
		 *
		 * @returns The STT result. The user is responsible for freeing the string.
		 *         Returns NULL on error.
		 */
		stt(buffer: Buffer, sampleRate: number): string;
		
		/**
		 * Create a new streaming inference state. The streaming state returned
		 *        by this function can then be passed to {@link feedAudioContext()}
		 *        and {@link finishStream()}.
		 *
		 * @param preAllocFrames Number of timestep frames to reserve. One timestep
		 *                        is equivalent to two window lengths (20ms). If set to 
		 *                        0 we reserve enough frames for 3 seconds of audio (150).
		 * @param sampleRate The sample-rate of the audio signal.
		 *
		 * @returns an opaque pointer that represents the streaming state. Can be NULL if an error occurs.
		 */
		setupStream(preAllocFrames: number, sampleRate: number): any;
		
		/**
		 * Feed audio samples to an ongoing streaming inference.
		 *
		 * @param buffer An array of 16-bit, mono raw audio samples at the
		 *                appropriate sample rate.
		 */
		feedAudioContent(buffer: Buffer): void;
		
		/**
		 * Compute the intermediate decoding of an ongoing streaming inference.
		 *        This is an expensive process as the decoder implementation isn't
		 *        currently capable of streaming, so it always starts from the beginning
		 *        of the audio.
		 *
		 * @param sctx A streaming state pointer returned by {@link setupStream()}.
		 * @returns The STT intermediate result. The user is responsible for freeing the
		 *         string.
		 */
		intermediateDecode(sctx: any): string;
		
		/**
		 * Signal the end of an audio signal to an ongoing streaming
		 *        inference, returns the STT result over the whole audio signal.
		 *
		 * @param sctx A streaming state pointer returned by {@link setupStream()}.
		 * @returns The STT result. The user is responsible for freeing the string.
		 */
		finishStream(sctx: any): string;
	}
	
	/**
	 * Given audio, return a vector suitable for input to a DeepSpeech
	 *        model trained with the given parameters.
	 *
	 * Extracts MFCC features from a given audio signal and adds the appropriate
	 * amount of context to run inference on a DeepSpeech model trained with
	 * the given parameters.
	 *
	 * @param buffer A 16-bit, mono raw audio signal at the appropriate sample
	 *                rate.
	 * @param sampleRate The sample-rate of the audio signal.
	 * @param nCep The number of cepstrum.
	 * @param nContext The size of the context window.
	 * @param[out] aMfcc An array containing features, of shape
	 *                   (@p aNFrames, ncep * ncontext). The user is responsible
	 *                   for freeing the array.
	 * @param[out] aNFrames (optional) The number of frames in @p aMfcc.
	 * @param[out] aFrameLen (optional) The length of each frame
	 *                       (ncep * ncontext) in @p aMfcc.
	 */
	export function audioToInputVector(buffer: Buffer, sampleRate: number, nCep: number, nContext: number): any;
	
	/**
	 * Print version of this library and of the linked TensorFlow library.
	 */
	export function printVersions(): void;
}
