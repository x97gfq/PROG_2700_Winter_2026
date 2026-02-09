# Activity 1: Environment Setup & API Testing

## Goal
Ensure your backend environment is running and you can communicate with it using Postman.

## Step 1: Start Docker Containers
1.  Open your terminal in VS Code.
2.  Navigate to the `Week6` directory (if not already there).
3.  Run the following command to start your backend and database:
    ```bash
    docker-compose up
    ```
    *Note: If you want to run it in the background, add `-d` at the end (`docker-compose up -d`).*

4.  Wait until you see "Connected to MongoDB" in the logs.

## Step 2: Test with Postman
1.  Open Postman.
2.  Create a new Request.
3.  Set the method to **GET**.
4.  Enter the URL: `http://localhost:3000/pokemon`
5.  Click **Send**.

## Success Criteria
-   You should receive a **200 OK** status.
-   The response body should be a JSON array containing Pokemon objects (e.g., Pikachu, Charmander, etc.).

If you see an error (e.g., "Connection Refused"), ensure your Docker containers are running and that port 3000 is not blocked.
