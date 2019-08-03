const fs = require('fs');

const stream = fs.createWriteStream('./seedingFiles/seed_listings_types.csv');

const write = () => {
  return new Promise((resolve) => {
    stream.once('drain', resolve)
  })
}
  
const generateListingsTypesData = async () => {
  let typeOptions = ['Entire place','Private room','Hotel room','Shared room'];
  let type_id = 1;
  let canWrite = true;

  for (let i = 0; i < typeOptions.length; i++) {
    let data = `${type_id}|${typeOptions[i]}\n`;
    canWrite = stream.write(data);
    
    if (!canWrite) {
      await write();
    }
    
    type_id++;
  }
}

generateListingsTypesData();