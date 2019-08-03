const fs = require('fs');

const stream = fs.createWriteStream('./seedingFiles/seed_highlights.csv');

const write = () => {
  return new Promise((resolve) => {
    stream.once('drain', resolve)
  })
}

const generateHighlights = async () => {
  let highlights_id = 1;

  // let typeOptions = ['Entire place','Private room','Hotel room','Shared room'];

  // for (let i = 0; i < typeOptions.length; i++) {  
  //   let type = `${highlights_id} | ${typeOptions[i]} | ${null}\n`;
  //   let ableToWrite = stream.write(type);
    
  //   if (!ableToWrite) {
  //     await write();
  //   }
    
  //   highlights_id++;
  // }

  let highlightOptions = {
    'is a Superhost': 'Superhosts are experienced highly rated hosts who are committed to providing great stays for guests.',
    'Sparkling clean': '72 recent guests said this place was sparkling clean.',
    'Self check-in': 'Check yourself in with the lockbox.',
    'Great location': '65 of recent guests gave the location a 5-star rating.',
    'Great check-in experience': '98% of recent guests gave the check-in process a 5-star rating.'
  };

  let keys = Object.keys(highlightOptions);
  
  for (let j = 0; j < keys.length; j++) {
    let highlight = `${highlights_id}|${keys[j]}|${highlightOptions[keys[j]]}\n`;
    let canWrite = stream.write(highlight);
    
    if (!canWrite) {
      await write();
    }
    
    highlights_id++;
  }
}

generateHighlights();