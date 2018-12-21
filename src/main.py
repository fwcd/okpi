import subprocess
import speech_recognition
import os

MODEL_FILE = "local/models/output_graph.pbmm"
ALPHABET_FILE = "local/models/alphabet.txt"
AUDIO_FILE = "local/input.wav"
LANGUAGE_MODEL_FILE = "local/models/lm.binary"
TRIE_FILE = "local/models/trie"

def to_abs_path(rel_path):
    abs_path = os.path.join(os.getcwd(), rel_path)
    if not os.path.isfile(abs_path):
        raise ValueError(abs_path + " file not found")
    return abs_path

def main():
    
    print("Output:", speech_recognition.speech_to_text(
        model_file=to_abs_path(MODEL_FILE),
        alphabet_file=to_abs_path(ALPHABET_FILE),
        audio_file=to_abs_path(AUDIO_FILE),
        language_model=to_abs_path(LANGUAGE_MODEL_FILE),
        trie=to_abs_path(TRIE_FILE)
    ))

if __name__ == "__main__":
    main()
