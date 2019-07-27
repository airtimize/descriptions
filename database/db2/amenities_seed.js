// const db = require('./pg_index.js');
const fs = require('fs');

const stream = fs.createWriteStream('./seedingFiles/seed_amenities.csv');

const write = () => {
  return new Promise((resolve) => {
    stream.once('drain', resolve)
  })
}

const generateAmenities = async () => {
  let amenities_id = 1;
  // let amenity_list = ['Wifi', 'TV', 'Cable TV', 'Iron', 'Dryer', 'Hot water', 'Washer', 
  // 'Heating', 'Essentials', 'Laptop friendly workspace', 'Air conditioning', 'Baby bath', 
  // 'Kid books and toys', 'Crib', 'High chair', 'Room-darkening shades', 'Window guards',
  // 'Free parking on premises', 'Kitchen', 'Breakfast', 'Cooking basics', 'Private entrance', 
  // 'Host greets you', 'Hangers', 'Hair dryer', 'Shampoo', 'Bed linens', 
  // 'Extra pillows and blankets', 'Luggage dropoff allowed', 'Long term stays allowed', 
  // 'Fire extinguisher', 'First aid kit', 'Smoke detector', 'Carbon monoxide detector'];

  let amenity_list = ['Wifi', 'TV', 'Cable TV', 'Iron', 'Dryer', 'Hot water', 'Washer', 
  'Heating', 'Essentials', 'Laptop friendly workspace', 'Air conditioning'];

  let amenity_categories = {
    basic: ['Wifi', 'TV', 'Cable TV', 'Iron', 'Dryer', 'Hot water', 'Washer', 
    'Heating', 'Essentials', 'Laptop friendly workspace', 'Air conditioning']
    // familyFeatures: ['Baby bath', 'Kid books and toys', 'Crib', 'High chair', 
    // 'Room-darkening shades', 'Window guards'],
    // facilities: ['Free parking on premises'],
    // dining: ['Kitchen', 'Breakfast', 'Cooking basics'],
    // guestAccess: ['Private entrance', 'Host greets you'],
    // bedAndBath: ['Hangers', 'Hair dryer', 'Shampoo', 'Bed linens', 
    // 'Extra pillows and blankets'],
    // logistics: ['Luggage dropoff allowed', 'Long term stays allowed'],
    // safetyFeatures: ['Fire extinguisher', 'First aid kit', 'Smoke detector', 
    // 'Carbon monoxide detector']
  };

  for (let n = 0; n < amenity_list.length; n++) {
    let category = null;
    
    let keys = Object.keys(amenity_categories);
    for (let o = 0; o < keys.length; o++) {
      if (amenity_categories[keys[o]].includes(amenity_list[n])) {
        category = keys[o];
        break;
      }
    }

    let data = `${amenities_id} | ${amenity_list[n]} | ${category}\n`;
    
    let canWrite = stream.write(data);

    if (!canWrite) {
      await write();
    }

    amenities_id++;
  }
}

generateAmenities();
