CREATE KEYSPACE descriptions WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};

CREATE TABLE listings (
  listings_id int, 
  title varchar, 
  location varchar, 
  host_name varchar, 
  host_pic varchar, 
  listing_type varchar, 
  bed_rm_num int, 
  bath_rm_num int, 
  guest_max int, 
  beds varchar, 
  bed_num int, 
  highlights map<varchar, varchar>,
  general text,
  wifi map<varchar, varchar>,
  tv map<varchar, varchar>,
  cable_tv map<varchar, varchar>,
  iron map<varchar, varchar>,
  dryer map<varchar, varchar>,
  hot_water map<varchar, varchar>,
  washer map<varchar, varchar>,
  heating map<varchar, varchar>,
  essentials map<varchar, varchar>,
  laptop_friendly_workspace map<varchar, varchar>,
  air_conditioning map<varchar, varchar>,
  PRIMARY KEY (listings_id)
);
