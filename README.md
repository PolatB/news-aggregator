# News Aggregator Dockerization

This repository contains the news-aggregator code that can be containerized using Docker.

## Running the Application in a Docker Container

### Prerequisites
- Docker must be installed on your machine. You can download and install Docker from the official Docker website: [https://www.docker.com/get-started](https://www.docker.com/get-started).

### Step 1: Pull Docker Image
Pull the Docker image for the news-aggregator from Docker Hub using the following command:

docker pull polatburak/news-aggregator

### Step 2: Run Docker Container
Once the Docker image is pulled, run it as a Docker container using the following command:

docker run -d -p 3000:3000 polatburak/news-aggregator

This command will start a Docker container in detached mode (-d) and map port 3000 of the container to port 3000 on your host machine.

### Step 3: Access the Application
Once the Docker container is running, you can access your news-aggregator by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

### Step 4: Stop the Container (Optional)
If you want to stop the Docker container, you can use the following command:

docker stop container_id

Replace `container_id` with the ID of the container you want to stop. You can get the container ID by running `docker ps` and finding the ID of the container running your news-aggregator.

That's it! You have successfully run the news-aggregator within a Docker container. If you encounter any issues or have any questions, please refer to the Docker documentation or feel free to reach out for assistance.
