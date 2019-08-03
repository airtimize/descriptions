const fs = require('fs');
const Uuid = require('cassandra-driver').types.Uuid;

const stream = fs.createWriteStream('../../../cassandraSEED/seedingFiles/seed_amenities.csv');

const write = () => {
  return new Promise((resolve) => {
    stream.once('drain', resolve)
  })
}

const generateAmenitiesData = async () => {
  let listings_id = 8502400;
  
  while (listings_id <= 10000000) {
    let randomListNum = Math.floor(Math.random() * 4);
    let amenity_list;
    let notIncluded;

    if (randomListNum === 1) {
      amenity_list = ['Wifi', 'TV', 'Cable TV', 'Iron', 'Dryer', 'Hot water', 'Washer', 
      'Heating', 'Essentials', 'Laptop friendly workspace', 'Air conditioning', 'Baby bath', 
      'Kid books and toys', 'Crib', 'High chair', 'Room-darkening shades', 'Window guards',
      'Free parking on premises', 'Kitchen', 'Breakfast', 'Cooking basics', 'Private entrance', 
      'Host greets you', 'Hangers', 'Hair dryer', 'Shampoo', 'Bed linens', 
      'Extra pillows and blankets', 'Luggage dropoff allowed', 'Long term stays allowed', 
      'Fire extinguisher', 'First aid kit', 'Smoke detector', 'Carbon monoxide detector'];
    } else if (randomListNum === 2) {
      amenity_list = ['Wifi', 'TV', 'Cable TV', 'Iron', 'Dryer', 'Washer', 'Heating', 'Essentials', 
      'Air conditioning', 'Room-darkening shades', 'Kitchen', 'Breakfast', 'Hangers', 'Hair dryer', 
      'Shampoo', 'Bed linens', 'Extra pillows and blankets', 'Luggage dropoff allowed', 'First aid kit'];
      notIncluded = ['Laptop friendly workspace', 'Smoke detector', 'Carbon monoxide detector', 'Private entrance']
    } else if (randomListNum === 3) {
      amenity_list = ['Wifi', 'Iron', 'Hot water', 'Heating', 'Essentials', 'Washer','Air conditioning', 
      'Baby bath', 'Kid books and toys', 'Crib', 'High chair', 'Window guards', 'Free parking on premises', 
      'Kitchen', 'Cooking basics', 
      'Host greets you', 'Hangers', 'Hair dryer', 'Shampoo', 'Bed linens', 'Free street parking',
      'Extra pillows and blankets', 'Luggage dropoff allowed', 'Fire extinguisher', 'First aid kit', 
      'Smoke detector', 'Carbon monoxide detector'];
      notIncluded = ['Dryer', 'Tv', 'Private entrance'];
    } else if (randomListNum === 0) {
      amenity_list = ['Wifi', 'Tv', 'Cable Tv', 'Iron', 'Dryer', 'Hot water', 'Washer', 'Heating', 'Essentials', 
      'Laptop friendly workspace', 'Air conditioning'];
    }
    
    for (let k = 0; k < amenity_list.length; k++) {
      const amenities_id = Uuid.random();
      let additionalInfo = '';

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
      } else if (amenity_list[k] === 'Breakfast') {
        additionalInfo = 'Breakfast is provided';
      } else if (amenity_list[k] === 'Long term stays allowed') {
        additionalInfo = 'Allow stay for 28 days or more';
      }

      let amenity_categories = {
        Basic: ['Wifi', 'TV', 'Cable TV', 'Iron', 'Dryer', 'Hot water', 'Washer', 
        'Heating', 'Essentials', 'Laptop friendly workspace', 'Air conditioning'],
        'Family features': ['Baby bath', 'Kid books and toys', 'Crib', 'High chair', 
        'Room-darkening shades', 'Window guards'],
        Facilities: ['Free parking on premises'],
        Dining: ['Kitchen', 'Breakfast', 'Cooking basics'],
        'Guest access': ['Private entrance', 'Host greets you'],
        'Bed and bath': ['Hangers', 'Hair dryer', 'Shampoo', 'Bed linens', 
        'Extra pillows and blankets'],
        Logistics: ['Luggage dropoff allowed', 'Long term stays allowed'],
        'Safety features': ['Fire extinguisher', 'First aid kit', 'Smoke detector', 
        'Carbon monoxide detector']
      };

      let category = 'Basic';

      for (var key in amenity_categories) {
        if (amenity_categories[key].includes(amenity_list[k])) {
          category = key;
          break;
        }
      }

      let data = `${listings_id}|${amenity_list[k]}|${additionalInfo}|${amenities_id}|${category}\n`;
      
      let canWrite = stream.write(data);      
      
      if (!canWrite) {
        await write();
      }
    }

    if (notIncluded) {
      for (let l = 0; l < notIncluded.length; l++) {
        const notIncluded_id = Uuid.random();
        let notIncludedData = `${listings_id}|${notIncluded[l]}||${notIncluded_id}|Not included\n`;
        let ableToWrite = stream.write(notIncludedData);      
      
        if (!ableToWrite) {
          await write();
        }
      }
    }
    
    if (listings_id % 100000 === 0) {
      console.log(listings_id);
    }

    listings_id++;
  }
}

generateAmenitiesData();