CREATE DATABASE descriptions WITH OWNER airtimize;

\c descriptions airtimize

CREATE TABLE IF NOT EXISTS hosts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  pic_url VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS listings_types (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS listings (
  id SERIAL PRIMARY KEY, 
  title VARCHAR(100), 
  location VARCHAR(30), 
  bed_rm_num SMALLINT, 
  bath_rm_num SMALLINT, 
  guest_max SMALLINT, 
  beds VARCHAR(200), 
  bed_num SMALLINT, 
  general TEXT,
  hosts_id INTEGER REFERENCES hosts(id),
  listings_types_id INTEGER REFERENCES listings_types(id)
);

CREATE TABLE IF NOT EXISTS amenities_categories (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS amenities (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(50), 
  amenities_categories_id INTEGER REFERENCES amenities_categories(id)
);

CREATE TABLE IF NOT EXISTS listings_amenities (
  id SERIAL PRIMARY KEY, 
  listings_id INTEGER REFERENCES listings(id), 
  amenities_id SMALLINT REFERENCES amenities(id), 
  offers BOOLEAN, 
  additional_info VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS highlights (
  id SERIAL PRIMARY KEY,
  type VARCHAR(100),
  info VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS listings_highlights (
  id SERIAL PRIMARY KEY, 
  listings_id INTEGER REFERENCES listings(id), 
  highlights_id SMALLINT REFERENCES highlights(id)
);
