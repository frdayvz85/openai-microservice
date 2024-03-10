FROM python:3.9-slim

WORKDIR /music-generate

COPY ./requirements.txt /music-generate/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /music-generate/requirements.txt

COPY ./app /music-generate/app

CMD ["uvicorn", "app.src.app:app", "--host", "0.0.0.0", "--port", "7000"]