FROM python:3.7.0-slim

COPY requirements.txt /requirements.txt
RUN ["pip3", "install", "-r", "requirements.txt"]

COPY src /app
CMD ["python3", "/app/main.py"]
