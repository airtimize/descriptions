// const db = require('./pg_index.js');
const fs = require('fs');

const stream = fs.createWriteStream('./seedingFiles/seed_listings_amenities.csv');  

const write = () => {
  return new Promise((resolve) => {
    stream.once('drain', resolve)
  })
}

const generateListingsAmenities = async () => {
  let listings_amenities_id = 1;
  let listings_id = 1;
  let amenities_id = 1;
  let amenity_list = ['Wifi', 'TV', 'Cable TV', 'Iron', 'Dryer', 'Hot water', 'Washer', 
  'Heating', 'Essentials', 'Laptop friendly workspace', 'Air conditioning'];

  while (listings_id <= 10000000) {
    while (amenities_id <= amenity_list.length) {
      
      let decidingNum = Math.floor(Math.random() * 2);
      let offers = decidingNum >= 1 ? true : false;
      let additionalInfo = null;

      if (amenity_list[amenities_id] === 'Wifi') {
        additionalInfo = 'Continuous access in the listing';
      } else if (amenity_list[amenities_id] === 'Kitchen') {
        additionalInfo = 'Space where guests can cook their own meals';
      } else if (amenity_list[amenities_id] === 'Dryer' || amenity_list[amenities_id] === 'Washer') {
        additionalInfo = 'In the building, free or for a fee';
      } else if (amenity_list[amenities_id] === 'Essentials') {
        additionalInfo = 'Towels, bed sheets, soap, and toilet paper';
      } else if (amenity_list[amenities_id] === 'Laptop friendly workspace') {
        additionalInfo = 'A table or desk with space for a laptop and a chair that’s comfortable to work in';
      } else if (amenity_list[amenities_id] === 'Heating') {
        additionalInfo = 'Central heating or a heater in the listing';
      } else if (amenity_list[amenities_id] === 'Luggage dropoff allowed') {
        additionalInfo = 'For guests convenience when they have early arrival or late departure';
      }

      let data = `${listings_amenities_id}|${listings_id}|${amenities_id}|${offers}|${additionalInfo}\n`;

      if (listings_amenities_id % 500000 === 0) {
        console.log(listings_amenities_id);
      }

      let canWrite = stream.write(data);

      if (!canWrite) {
        await write();
      }
      
      amenities_id++;
      listings_amenities_id++;
    }
    amenities_id = 1;
    listings_id++;
  }
}

generateListingsAmenities();