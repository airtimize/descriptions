CREATE KEYSPACE descriptions WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};

USE descriptions;

CREATE TABLE descriptions (
  descriptions_id uuid,
  listings_id int,
  bath_rm_num int,
  bed_num int,
  bed_rm_num int,
  beds text,
  general text,
  guest_max int,
  highlights map<text, text>,
  host_name text,
  host_pic text,
  listing_type text,
  location text,
  title text,
  PRIMARY KEY (listings_id)
);

CREATE TABLE amenities (
  amenities_id uuid,
  listings_id int,
  additional_info text,
  category text,
  name text,
  PRIMARY KEY ((listings_id), name)
) WITH CLUSTERING ORDER BY (name ASC);
