# OkPi
Virtual assistant with offline voice recognition. Despite being primarily designed for Raspberry Pi, it should compile on any computer running Linux or macOS.

## Installation

### DeepSpeech
* `apt install libportaudio0 libportaudio2 libportaudiocpp0 libatlas-base-dev sox portaudio19-dev`
* `pip3 install deepspeech pyaudio sox`
* Obtain a recent version of the DeepSpeech language model from [GitHub releases](https://github.com/mozilla/DeepSpeech/releases)
    * For example, to download and extract version `0.4.1`:
        * `mkdir local && cd local`
        * `wget https://github.com/mozilla/DeepSpeech/releases/download/v0.4.1/deepspeech-0.4.1-models.tar.gz`
        * `tar -zxvf deepspeech-0.4.1-models.tar.gz`
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

### Pocket Sphinx (optional)
* The PocketSphinx installation currently requires Node.js 6
    * This can be achieved by using a version manager such as [nvm](https://github.com/creationix/nvm):
        * `nvm install 6`
* Install the [PocketSphinx](https://github.com/cmusphinx/node-pocketsphinx) [dependencies](https://github.com/cmusphinx/node-pocketsphinx#installation):
    * `apt-get install cmake pkg-config libpcre3-dev bison`
    * [`swig` from GitHub](https://github.com/swig/swig)
    * [`sphinxbase` from GitHub](https://github.com/cmusphinx/sphinxbase)
    * [`pocketsphinx` from GitHub](https://github.com/cmusphinx/pocketsphinx)
    * Note that certain tweaks might be required prior to install:
        * `export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig`
        * `ln -s /usr/bin/swig3.0 /usr/bin/swig` (Create a symlink for `swig3.0`)
    * `npm install cmake-js -g`

## Launching
* Make sure that the model is located in `local/models`
* `npm run start -- --model=local/models/output_graph.pbmm --alphabet=local/models/alphabet.txt --lm=local/models/lm.binary --trie=local/models/trie`
    * Or alternatively using watch mode:
    * `npm run watch`
    * `npm run launch -- --model=local/models/output_graph.pbmm --alphabet=local/models/alphabet.txt --lm=local/models/lm.binary --trie=local/models/trie` (in a separate terminal)

## Architecture
* The application roughly implements the following structure:

* Speech input 
    * -> `AudioInput`
    * -> `SpeechRecognitionEngine`
    * -> `UtteranceProcessor`
    * -> `Skill`
    * -> `OutputFacade`
