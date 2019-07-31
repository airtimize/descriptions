const fs = require('fs');

const stream = fs.createWriteStream('./seedingFiles/seed_amenities_categories.csv');

const write = () => {
  return new Promise((resolve) => {
    stream.once('drain', resolve)
  })
}

generateAmenityCategories = async () => {
  let amenity_categories_id = 1;
  let categories = ['Basic', 'Beds and bath', 'Dining', 'Facilities',   
  'Family features', 'Guest access', 'Logistics', 'Not included', 'Outdoor', 
  'Safety features'];
  let canWrite = true;

  for (let i = 0; i < categories.length; i++) {
    let data = `${amenity_categories_id}|${categories[i]}\n`;    
    canWrite = stream.write(data);
    
    if (!canWrite) {
        await write();
    }
    
    amenity_categories_id++;
  }
}


generateAmenityCategories();