CREATE KEYSPACE descriptions WITH REPLICATION = {'class' : 'SimpleStrategy', 'replication_factor' : 1};

CREATE TABLE listings (
  listings_id int, 
  title varchar(100), 
  location varchar(30), 
  host_name varchar(25), 
  host_pic varchar(40), 
  listing_type varchar(20), 
  bed_rm_num int, 
  bath_rm_num int, 
  guest_max int, 
  beds varchar(200), 
  bed_num int, 
  highlights map<varchar(50), varchar(100)>,
  general text,
  wifi map<varchar(20), varchar(100)>,
  tv map<varchar(20), varchar(100)>,
  cable_tv map<varchar(20), varchar(100)>,
  iron map<varchar(20), varchar(100)>,
  dryer map<varchar(20), varchar(100)>,
  hot_water map<varchar(20), varchar(100)>,
  washer map<varchar(20), varchar(100)>,
  heating map<varchar(20), varchar(100)>,
  essentials map<varchar(20), varchar(100)>,
  laptop_friendly_workspace map<varchar(20), varchar(100)>,
  air_conditioning map<varchar(20), varchar(100)>,
  PRIMARY KEY (listings_id)
);
