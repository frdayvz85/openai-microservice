# API Gateway for Microservices

This microservice is an API Gateway for microservices, built using Node.js, Express, and TypeScript. It serves as a single entry point for multiple microservices, providing routing, request/response handling, and other gateway functionalities.

## Table of Contents

- [API Gateway for Microservices](#api-gateway-for-microservices)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Running the Application](#running-the-application)
    - [Available Scripts](#available-scripts)
    - [API Documentation](#api-documentation)

## Getting Started

These instructions will help you set up and run the API Gateway on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [TypeScript](https://www.typescriptlang.org/)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/frdayvz85/openai-microservice
    cd api-gateway
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Configuration

Create a `.env` file in the root directory of the project and add following configuration variables. 

```env
PORT=8000
CODE_GENERATE_API_URL = 'http://localhost:5000'
VIDEO_GENERATE_API_URL = 'http://localhost:4000'
IMAGE_GENERATE_API_URL = 'http://localhost:6000'
MUSIC_GENERATE_API_URL = 'http://localhost:7000'
```

### Running the Application
To start the API Gateway, run:
```sh
npm run start
```
The server will start on the port specified in `.env` file (default is 8000).

### Available Scripts
- `npm run start`: Runs the application.
- `npm run dev`: Runs the application in development mode with hot reloading.
- `npm run build`: Compiles TypeScript files to JavaScript.


### API Documentation
The API Gateway provides endpoints for microservices. Below is an example of the endpoints and their descriptions:

- `GET /`: Testing API Gateway.
- `GET /code-generate`: Redirect request to code microservice.
- `GET /music-generate`: Redirect request to music microservice.
- `GET /image-generate`: Redirect request to image microservice.
- `GET /video-generate`: Redirect request to video microservice.

Refer to the source code for more details on available endpoints and their usage.

Happy Coding! 🚀