const fs = require('fs');

const stream = fs.createWriteStream('./seedingFiles/seed_listings_highlights.csv');

const write = () => {
  return new Promise((resolve) => {
    stream.once('drain', resolve)
  })
}

generateListingsHighlights = async () => {
  let listings_highlights_id = 1;
  let listings_id = 1;
  // let highlights_id;

  while (listings_id <= 10000000) {
    // let typeOptions = ['Entire place','Private room','Hotel room','Shared room'];
    // let typeIndex = Math.floor(Math.random() * 4);
    // let type = typeOptions[typeIndex];

    // if (type === 'Entire place') {
    //   highlights_id = 1;
    // } else if (type === 'Private room') {
    //   highlights_id = 2;
    // } else if (type === 'Hotel room') {
    //   highlights_id = 3;
    // } else if (type === 'Shared room') {
    //   highlights_id = 4;
    // }

    // let data = `${listings_highlights_id} | ${listings_id} | ${highlights_id}\n`;

    // let ableToWrite = stream.write(data);

    // if (!ableToWrite) {
    //   await write();
    // }

    // listings_highlights_id++;

    let highlightOptions = {
      'is a Superhost': 1,
      'Sparkling clean': 2,
      'Self check-in': 3,
      'Great location': 4,
      'Great check-in experience': 5
    };

    let keys = Object.keys(highlightOptions);
    let selected = [];

    for (let k = 0; k < 3; k++){
      let randomIndex = Math.floor(Math.random() * 5);
      if (!selected.includes(keys[randomIndex])) {
        let details = `${listings_highlights_id}|${listings_id}|${highlightOptions[keys[randomIndex]]}\n`;
        let canWrite = stream.write(details);
        selected.push(keys[randomIndex]);
    
        if (!canWrite) {
          await write();
        }

        listings_highlights_id++;
      } else {
        k--;
      }
    }

    if (listings_id % 500000 === 0) {
      console.log(listings_id);
    }

    listings_id++;
  }
}

generateListingsHighlights();