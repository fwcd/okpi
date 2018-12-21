# OkPi
A speech assistant using Mozilla's [DeepSpeech engine](https://github.com/mozilla/DeepSpeech).

The application is still experimental and requires recorded user input.

## Getting Started
* Create a directory named `local` in the repository containing:
    * `input.wav` representing the input audio
    * `alphabet.txt` from the DeepSpeech model
    * `lm.binary` from the DeepSpeech model
    * `output_graph.pbmm` from the DeepSpeech model
    * `trie` from the DeepSpeech model
* A recent version of the DeepSpeech model can be obtained from [GitHub releases](https://github.com/mozilla/DeepSpeech/releases)
    * See [this README](https://github.com/mozilla/DeepSpeech#getting-the-pre-trained-model) for further instructions

## Building and Running
Use [Docker](https://docs.docker.com/):

* `docker build . -t okpi:latest`
* `docker run -v local:/app/local okpi:latest`
