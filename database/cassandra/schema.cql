CREATE KEYSPACE descriptions WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};

USE descriptions;

CREATE TABLE descs (
  descriptions_id uuid,
  listings_id int,
  bath_rm_num int,
  bed_num int,
  bed_rm_num int,
  beds text,
  general text,
  guest_access text,
  guest_max int,
  highlights map<text, text>,
  host_name text,
  host_pic text,
  interaction_with_guests text,
  license_reg_num text,
  listing_type text,
  location text,
  other_things_to_note text,
  the_space text,
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
