# Week 6: Dockerized Pokemon API & Frontend

This project demonstrates a full-stack application using Node.js, Express, MongoDB, and Docker.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Must be installed and running)
- [Postman](https://www.postman.com/downloads/) (For testing the API)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) (Optional, for viewing the database)

## Project Structure

- `backend_docker/`: Contains the Node.js Express API.
- `frontend_client/`: Contains the HTML/CSS/JS frontend.
- `docker-compose.yml`: Orchestrates the Backend and MongoDB services.

## Architecture
[architecture_uml.png]


## Setup & Running

1.  Open a terminal in the `Week6` directory.
2.  Run the following command to build and start the containers:
    ```bash
    docker-compose up --build
    ```
3.  Wait for the logs to show "Server is running on port 3000" and "Connected to MongoDB".

## Accessing the Application

- **Frontend**: Open `frontend_client/index.html` in your browser.
- **Swagger Documentation**: Go to [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **API Endpoints**:
    - `GET http://localhost:3000/pokemon`
    - `POST http://localhost:3000/pokemon`
    - ...and more (see Swagger)

## Database

The MongoDB container is named `prog2700-mongo` and runs on port `27017`.
The database name is `pokemon`.
It is automatically seeded with initial data on the first run.
