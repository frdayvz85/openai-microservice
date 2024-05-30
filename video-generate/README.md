# Video Generate Microservice

This microservice is an video generate microservice and built using Node.js, Express, and TypeScript.

## Table of Contents

- [Video Generate Microservice](#video-generate-microservice)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Running the Application](#running-the-application)
    - [Available Scripts](#available-scripts)
    - [API Documentation](#api-documentation)

## Getting Started

These instructions will help you set up and run the video generate microservice on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [TypeScript](https://www.typescriptlang.org/)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/frdayvz85/openai-microservice
    cd video-generate
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Configuration

Create a `.env` file in the root directory of the project and add following configuration variables. 

```env
PORT=4000
REPLICATE_API_TOKEN='REPLICATE_API_TOKEN'
DATABASE_URL="DATABASE_URL"
API_RATE_LIMIT=5
```

The database should be MongoDB because the current implementation only supports MongoDB.

### Running the Application
To start the video generate microservice, run:
```sh
npm run start
```
The server will start on the port specified in `.env` file (default is 4000).

### Available Scripts
- `npm run start`: Runs the application.
- `npm run dev`: Runs the application in development mode with hot reloading.
- `npm run build`: Compiles TypeScript files to JavaScript.
- `npm run test`: Runs tests.


### API Documentation
Following endpoints are implemented for this microservice. Below is an example of the endpoints and their descriptions:

- `GET /`: Testing video generate microservice.
- `POST /video`: Generate video.
- `GET /prompts`: Get all generated contents.
- `GET /prompts/:id`: Get specific generated content.
- `DELETE /prompts/:id`: Delete specific generated content.


Refer to the source code for more details on available endpoints and their usage.

Happy Coding! 🚀