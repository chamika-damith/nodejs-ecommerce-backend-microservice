E-commerce Nodejs Backend (Microservices-based)

🚀 Overview

This is a microservices-based e-commerce backend built using Node.js, Express, Docker, and Kubernetes. It follows a scalable architecture with separate services for authentication, product management, and order processing. It also supports JWT authentication, Redis caching, and a MongoDB/MySQL database setup.

🏗 Architecture

API Gateway: Centralized entry point for routing requests.

Auth Service: Handles user authentication with JWT & OAuth.

Product Service: Manages product CRUD operations using MySQL & Sequelize.

Order Service: Handles orders, uses MongoDB & Redis for caching.

Dockerized Deployment: Each service runs in a separate container.

Kubernetes (EKS) Deployment: Services are deployed to AWS using Kubernetes.


🛠 Tech Stack

Backend: Node.js, Express.js

Databases: MySQL (Product Service), MongoDB (Order Service)

Cache: Redis

Authentication: JWT, OAuth

Containerization: Docker, Kubernetes

Cloud Deployment: AWS (ECR, EKS, EC2, S3)


🔥 Features

✅ Microservices architecture (Auth, Product, Order services)
✅ JWT & OAuth authentication
✅ API Gateway for unified access
✅ MySQL & MongoDB integration
✅ Redis caching for performance
✅ Dockerized & Kubernetes-deployed on AWS

🏗 Setup & Installation

1️⃣ Clone the Repository

git clone https://github.com/chamika-damith/ecommerce-backend.git
cd ecommerce-backend

2️⃣ Set Up Environment Variables

Create a .env file in each service directory (auth-service, product-service, order-service, api-gateway) and configure the following:

Auth Service (.env)

PORT=5003
MONGO_URI=mongodb://localhost:27017/authdb
JWT_SECRET=your_secret_key

Product Service (.env)

PORT=5001
MYSQL_DB_HOST=localhost
MYSQL_DB_USER=root
MYSQL_DB_PASSWORD=yourpassword
MYSQL_DB_NAME=productdb

Order Service (.env)

PORT=5002
MONGO_URI=mongodb://localhost:27017/orderdb
REDIS_URL=redis://localhost:6379

3️⃣ Install Dependencies

cd auth-service && npm install
cd ../product-service && npm install
cd ../order-service && npm install
cd ../api-gateway && npm install

4️⃣ Run Services (Locally)

cd auth-service && npm start
cd ../product-service && npm start
cd ../order-service && npm start
cd ../api-gateway && npm start

🐳 Docker Deployment

1️⃣ Build and Run Docker Containers

docker-compose up --build

2️⃣ Stop Containers

docker-compose down

☁ Deploying to AWS (Kubernetes EKS)

1️⃣ Push Docker Images to AWS ECR

docker build -t api-gateway ./api-gateway
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

docker tag api-gateway:latest <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/api-gateway:latest
docker push <AWS_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/api-gateway:latest

Repeat for other services.

2️⃣ Deploy to Kubernetes (AWS EKS)

kubectl apply -f k8s-deployments.yaml
kubectl apply -f k8s-services.yaml

3️⃣ Monitor Services

kubectl get pods
kubectl get services

📡 API Endpoints

Auth Service

POST /auth/register - Register a new user

POST /auth/login - Authenticate user


Product Service

GET /products - Fetch all products

POST /products - Add a new product


Order Service

POST /orders - Place an order

GET /orders/:id - Get order details


API Documentation - https://documenter.getpostman.com/view/36185934/2sAYkAR33E



🚀 Future Improvements

Implement ElasticSearch for logging

Add gRPC for service-to-service communication

Implement Auto-scaling for high traffic


📝 License

This project is MIT Licensed.
