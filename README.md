# OkPi
A speech assistant using Mozilla's [DeepSpeech engine](https://github.com/mozilla/DeepSpeech).

The application is still experimental and requires recorded user input.

## Getting Started
* `apt-get install libportaudio0 libportaudio2 libportaudiocpp0 libatlas-base-dev portaudio19-dev`
* `pip3 install -r requirements.txt`
* Obtain a recent version of the DeepSpeech model from [GitHub releases](https://github.com/mozilla/DeepSpeech/releases)
    * See [this README](https://github.com/mozilla/DeepSpeech#getting-the-pre-trained-model) for further instructions
* Add the following file tree to the repository:
    * `local`
        * `input.wav` (input audio)
        * `models` (the DeepSpeech model)
            * `alphabet.txt`
            * `lm.binary`
            * `output_graph.pbmm`
            * `trie`

## Running
* `python3 src/main.py`
