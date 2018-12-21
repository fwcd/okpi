FROM python:3.7.0-slim

# RUN ["apt-get", "install", "python-pyaudio"]

COPY requirements.txt /requirements.txt
RUN ["pip3", "install", "-r", "requirements.txt"]

WORKDIR /app
COPY src src
CMD ["python3", "src/main.py"]
