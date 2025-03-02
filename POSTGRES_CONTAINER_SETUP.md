# 🚀 PostgreSQL Setup with Docker 🐳

This guide provides a step-by-step approach to setting up **PostgreSQL** in a **Docker container** with persistent storage.

## **📌 Prerequisites**

- Install [Docker](https://www.docker.com/)

---

## **1️ Create a `.env` File for Configuration**

In the project root directory, create a file named **`.env`** to store database credentials:

```ini
DB_USER=your_username
DB_PASS=your_password
DB_NAME_TEST=your_database
```

## **2 Command to start the PostgresSQL Container**

In your terminal, type the following command

- docker-compose run -d
  or (for newer versions of Docker Compose)
- docker compose run -d
