# Music Generate Microservice

This microservice is designed to generate music based on specified parameters and store metadata in MongoDB. The service is built using FastAPI, a modern web framework for building APIs with Python 3.7+.

## Table of Contents

- [Music Generate Microservice](#music-generate-microservice)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Dependencies](#dependencies)
    - [API Documentation](#api-documentation)

## Features

- Generate music based on user-defined prompt.
- Store url of generated music in MongoDB.
- Retrieve url of generated music.
- Delete url of generated music.

## Getting Started

These instructions will help you set up and run the music generate microservice on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following software installed on your machine:
- Python 3.7+
- MongoDB (optional)
- Cloudinary account

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/frdayvz85/openai-microservice
    cd music-generate
    ```

2. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `env\Scripts\activate`
    ```

3. Install the required dependencies:
   ```sh
    pip install -r requirements.txt
    ```
   

### Configuration

Create a `.env` file in the root directory of the project and add following configuration variables. 

```env
REPLICATE_API_TOKEN='REPLICATE_API_TOKEN'
DATABASE_URL="DATABASE_URL"
DATABASE_NAME='DATABASE_NAME'
CLOUD_NAME="Cloudinary CLOUD_NAME"
API_KEY="Cloudinary API_KEY"
API_SECRET="Cloudinary API_SECRET"
```
The database should be MongoDB because the current implementation only supports MongoDB.

### Running the Application
To start the music generate microservice, run:
```sh
py app/main.py
```

## Dependencies
- `FastAPI`: Web framework for building APIs.
- `Pydantic`: Data validation and settings management.
- `Motor`: Asynchronous MongoDB driver for Python.
- `Uvicorn`: ASGI server for running FastAPI applications.
- `Cloudinary`: Cloud-based image and video management services.

### API Documentation
Following endpoints are implemented for this microservice. Below is an example of the endpoints and their descriptions:

- `GET /`: Testing music generate microservice.
- `POST /music`: Generate music.
- `GET /prompts`: Get all generated contents.
- `GET /prompts/id`: Get specific generated content.
- `DELETE /prompts/id`: Delete specific generated content.


Refer to the source code for more details on available endpoints and their usage.

Happy Coding! 🚀