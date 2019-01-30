# OkPi
Virtual assistant with offline voice recognition. Despite being primarily designed for Raspberry Pi, it should compile on any computer running Linux or macOS.

## Installation

### DeepSpeech
* `apt install libportaudio0 libportaudio2 libportaudiocpp0 libatlas-base-dev sox portaudio19-dev`
* `pip3 install deepspeech pyaudio sox`
* Obtain a recent version of the DeepSpeech model from [GitHub releases](https://github.com/mozilla/DeepSpeech/releases)
    * See [this README](https://github.com/mozilla/DeepSpeech#getting-the-pre-trained-model) for further instructions
* Add the following file tree to the repository:
    * `local`
        * `input.wav` (16 kHz input audio)
        * `models` (the DeepSpeech model)
            * `alphabet.txt`
            * `lm.binary`
            * `output_graph.pbmm`
            * `trie`

### Say.js
* Install Festival with a default voice:
    * `apt-get install festival festvox-rablpc16k`

### NPM Dependencies
* `npm install`

## Launching
* Make sure that this repository (`OkPi`) is in the same folder as the cloned [`pocketsphinx` repository](https://github.com/cmusphinx/pocketsphinx)
* `npm run start`
    * Or alternatively using watch mode:
    * `npm run watch`
    * `npm run launch` (in a separate terminal)

## Architecture
* The application roughly implements the following structure:

* Speech input 
    * -> `AudioInput`
    * -> `SpeechRecognitionEngine`
    * -> `UtteranceProcessor`
    * -> `Skill`
    * -> `OutputFacade`
