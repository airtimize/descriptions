const fs = require('fs');
const Uuid = require('cassandra-driver').types.Uuid;

const stream = fs.createWriteStream('../../../cassandraSEED/seedingFiles/seed_amenities.csv');

const write = () => {
  return new Promise((resolve) => {
    stream.once('drain', resolve)
  })
}

const generateAmenitiesData = async () => {
    let listings_id = 1000001;
  
  while (listings_id <= 2000000) {
    let amenity_list = ['Wifi', 'Tv', 'Cable Tv', 'Iron', 'Dryer', 'Hot water', 'Washer', 'Heating', 'Essentials', 'Laptop friendly workspace', 'Air conditioning'];
    
    for (let k = 0; k < amenity_list.length; k++) {
      const amenities_id = Uuid.random();
      let additionalInfo = null;

      if (amenity_list[k] === 'Wifi') {
        additionalInfo = 'Continuous access in the listing';
      } else if (amenity_list[k] === 'Kitchen') {
        additionalInfo = 'Space where guests can cook their own meals';
      } else if (amenity_list[k] === 'Dryer' || amenity_list[k] === 'Washer') {
        additionalInfo = 'In the building, free or for a fee';
      } else if (amenity_list[k] === 'Essentials') {
        additionalInfo = 'Towels, bed sheets, soap, and toilet paper';
      } else if (amenity_list[k] === 'Laptop friendly workspace') {
        additionalInfo = 'A table or desk with space for a laptop and a chair that’s comfortable to work in';
      } else if (amenity_list[k] === 'Heating') {
        additionalInfo = 'Central heating or a heater in the listing';
      } else if (amenity_list[k] === 'Luggage dropoff allowed') {
        additionalInfo = 'For guests convenience when they have early arrival or late departure';
      }

      let data = `${listings_id}|${amenity_list[k]}|${additionalInfo}|${amenities_id}|Basic\n`;
      
      let canWrite = stream.write(data);      
      
      if (!canWrite) {
        await write();
      }
    }
    
    if (listings_id % 100000 === 0) {
      console.log(listings_id);
    }

    listings_id++;
  }
}

generateAmenitiesData();