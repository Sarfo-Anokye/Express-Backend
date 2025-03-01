# MITOCHRON HUB BACKEND ASSESSMNENT

1. Create a docker set up that:

- Runs a PostgreSQL database container (use the official image).
- Configures environment variables for the database (e.g., username, - password, and database name).
- Maps a local directory for persistent data storage.
- Exposes the database on a port (e.g., 5432).
- Document the steps to:
  Start the containerized database.

2. The schema model a database for a simple movie rental service that includes the following entities: users, movies, and rentals

- User

| Column  | Data Type | Constraints      | Description                     |
| ------- | --------- | ---------------- | ------------------------------- |
| `id`    | `UUID`    | Primary Key      | Unique identifier for the user. |
| `name`  | `TEXT`    | NOT NULL         | Name of the user.               |
| `email` | `TEXT`    | UNIQUE, NOT NULL | Email address of the user.      |

- Movie

| Column  | Data Type | Constraints | Description                      |
| ------- | --------- | ----------- | -------------------------------- |
| `id`    | `UUID`    | Primary Key | Unique identifier for the movie. |
| `name`  | `TEXT`    | NOT NULL    | Name of the movie.               |
| `genre` | `TEXT`    | NOT NULL    | Genre of the movie.              |

- Rental

| Column        | Data Type   | Constraints | Description                                  |
| ------------- | ----------- | ----------- | -------------------------------------------- |
| `id`          | `UUID`      | Primary Key | Unique identifier for the rental.            |
| `user_id`     | `UUID`      | Foreign Key | Identifier of the user who rented the movie. |
| `movie_id`    | `UUID`      | Foreign Key | Identifier of the movie rented by the user.  |
| `rented_at`   | `TIMESTAMP` | NOT NULL    | Date and time when the movie was rented.     |
| `returned_at` | `TIMESTAMP` | NULLABLE    | Date and time when the movie was returned.   |
| `due_date`    | `TIMESTAMP` | NOT NULL    | Date and time when the movie is due.         |

3. Create a node.js server to communicate with the database and implement the following endpoints:

- Create a new user.
- Get a user by ID.
- Get all users which accepts pagination queries and text search for acceptable fields.
- Update a user by ID.
- Delete a user by ID.
- Create a new movie.
- Get a movie by ID.
- Get all movies with pagination queries and text search for appropriate fields.
- Update a movie by ID.
- Delete a movie by ID.
- Rent a movie.
- Return a movie.
- Get all rentals with pagination.

4. Write basic unit tests for the endpoints.

DEADLINE: 3 working days from the date of receipt of this document. i.e 9PM 14th, February 2025.
