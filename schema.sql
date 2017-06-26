DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reviews;

CREATE TABLE albums (
  id SERIAL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  date_joined timestamp default current_timestamp,
  profile_pic VARCHAR(255)
);

CREATE TABLE reviews (
  id SERIAL,
  album_id INTEGER,
  user_id INTEGER,
  review TEXT
)
