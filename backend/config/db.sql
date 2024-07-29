CREATE DATABASE jwt_auth;

CREATE TABLE users(user_id SERIAL PRIMARY KEY, username VARCHAR(255),email VARCHAR(255), password VARCHAR(255),timestamp DATE);

INSERT INTO users
(username,email,password)
VALUES ('userone','emailone@gmail.com','passone');