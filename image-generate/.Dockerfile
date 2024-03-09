FROM python:3.9-slim

WORKDIR /image-generate

COPY ./requirements.txt /image-generate/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /image-generate/requirements.txt

COPY ./app /image-generate/app

CMD ["uvicorn", "app.src.app:app", "--host", "0.0.0.0", "--port", "6000"]