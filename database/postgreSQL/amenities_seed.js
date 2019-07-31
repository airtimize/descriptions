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
  // let amenities = ['Wifi', 'TV', 'Cable TV', 'Iron', 'Dryer', 'Hot water', 'Washer', 
  // 'Heating', 'Essentials', 'Laptop friendly workspace', 'Air conditioning', 'Baby bath', 
  // 'Kid books and toys', 'Crib', 'High chair', 'Room-darkening shades', 'Window guards',
  // 'Free parking on premises', 'Kitchen', 'Breakfast', 'Cooking basics', 'Private entrance', 
  // 'Host greets you', 'Hangers', 'Hair dryer', 'Shampoo', 'Bed linens', 
  // 'Extra pillows and blankets', 'Luggage dropoff allowed', 'Long term stays allowed', 
  // 'Fire extinguisher', 'First aid kit', 'Smoke detector', 'Carbon monoxide detector'];

  let amenities = ['Wifi', 'TV', 'Cable TV', 'Iron', 'Dryer', 'Hot water', 'Washer', 
  'Heating', 'Essentials', 'Laptop friendly workspace', 'Air conditioning'];

  let amenityList = {
    'Basic': ['Wifi', 'TV', 'Cable TV', 'Iron', 'Dryer', 'Hot water', 'Washer', 'Heating', 
    'Essentials', 'Laptop friendly workspace', 'Air conditioning'],
    'Family features': ['Baby bath', 'Kid books and toys', 'Crib', 'High chair', 
    'Room-darkening shades', 'Window guards'],
    'Facilities': ['Free parking on premises'],
    'Dining': ['Kitchen', 'Breakfast', 'Cooking basics'],
    'Guest access': ['Private entrance', 'Host greets you'],
    'Beds and bath': ['Hangers', 'Hair dryer', 'Shampoo', 'Bed linens', 'Extra pillows and blankets'],
    'Logistics': ['Luggage dropoff allowed', 'Long term stays allowed'],
    'Safety features': ['Fire extinguisher', 'First aid kit', 'Smoke detector', 'Carbon monoxide detector'],
    'Not included': [],
    'Outdoor': ['Patio or balcony','Garden or backyard']
  }

  let categoryList = {
    'Basic': 1,
    'Beds and bath': 2,
    'Dining': 3,
    'Facilities': 4,
    'Family features': 5,
    'Guest access': 6,
    'Logistics': 7,
    'Not included': 8,
    'Outdoor': 9,
    'Safety features': 10
  };

  let keys = Object.keys(categoryList);

  for (let n = 0; n < amenities.length; n++) {
    let category_id = 8;
    
    for (let o = 0; o < keys.length; o++) {
      let currentAmenityList = amenityList[keys[o]];
      if (currentAmenityList.includes(amenities[n])) {
        category_id = categoryList[keys[o]];
      }
    }

    let data = `${amenities_id}|${amenities[n]}|${category_id}\n`;
    
    let canWrite = stream.write(data);

    if (!canWrite) {
      await write();
    }

    amenities_id++;
  }
}

generateAmenities();