// const db = require('./pg_index.js');
const faker = require('faker');
const fs = require('fs');

const write = (writer, data) => {
  if (!writer.write(data)) {
    return new Promise((resolve) => {
      writer.once('drain', resolve)
    })
  }
}

const generateListingsData = () => {
  const stream = fs.createWriteStream('seed_listings.csv');
  let listings_id = 1;
  let count = 1;

  while (listings_id <= 1000000) {
    let header = faker.lorem.sentence();
    let title =  header.slice(0, header.length-1); // why does it need to be sliced?
    let location = faker.address.city();
    let host_name = faker.name.firstName();
    let host_pic = faker.image.imageUrl();
    let type = faker.random.arrayElement(['Entire place','Private room','Hotel room','Shared room']);
    let bedrmnum = 0;
    let bathrmnum = 0;
    let guestmax = 0;
    let beds = [];
    let bednum = 0;

    const generateDetail = (listingType) => {
      if (listingType === 'Entire place') {
        let bedcounter = 0;
        bedrmnum = faker.random.number({ min: 3, max: 6 }); // use math.random()
        bathrmnum = faker.random.number({ min: 1, max: bedrmnum });
        guestmax = faker.random.number({ min: bedrmnum, max: bedrmnum * 2 + 2 });
        let bedoptions = ['1 queen bed','1 single bed','1 king bed','2 single beds'];

        for (let i = 0; i < bedrmnum; i++) {
          let currBedoption = bedoptions[Math.floor(Math.random() * bedoptions.length)];
          bedcounter += parseInt(currBedoption.slice(0,1));
          beds.push(currBedoption);
        }

        // beds = beds; // what is this doing
        let bednum = bedcounter;
      } else if (listingType === 'Private room') {
        bedrmnum = 1;
        bathrmnum = 1;
        guestmax = faker.random.number({ min: 1, max: 3 });
        let bedoptions = ['1 queen bed','1 single bed','1 king bed','2 single beds'];
        let bedoption = bedoptions[Math.floor(Math.random() * bedoptions.length)];
        beds = [bedoption];
        bednum = parseInt(bedoption.slice(0,1));
      } else if (listingType === 'Hotel room') {
        let bedcounter = 0;
        bedrmnum = faker.random.number({min:1, max:3});
        bathrmnum = faker.random.number({min:1, max:bedrmnum});
        guestmax = faker.random.number({min:bedrmnum, max:bedrmnum*2+2});
        let bedoptions = ['1 queen bed','1 single bed','1 king bed','2 single beds']
        let beds = [];
          
        for (let j = 0; j < bedrmnum; j++) {
          let currBedoption = bedoptions[Math.floor(Math.random()*bedoptions.length)]
          bedcounter += parseInt(currBedoption.slice(0,1))
          beds.push(currBedoption)
        }
          
        //   beds = beds;
        bednum = bedcounter;
      } else if (listingType === 'Shared room'){
        bedrmnum = 1;
        bathrmnum = faker.random.number({min:bedrmnum, max:bedrmnum});
        guestmax = faker.random.number({min:1, max:bedrmnum*4});
        let bedoptions = ['1 queen bed','1 single bed','2 single beds'];
        let bedoption = bedoptions[Math.floor(Math.random()*bedoptions.length)]
        beds = [bedoption];
        bednum = parseInt(bedoption.slice(0,1));
      }
    }

    generateDetail(type);

    let highlights = [];
    let guest = (guestmax === 1) ? guestmax + ' guest': guestmax + ' guests';
    let bedrm = (bedrmnum === 1) ? bedrmnum + ' room' : bedrmnum + ' rooms';
    let bed = (bednum === 1) ? bednum + ' bed' : bednum + ' beds';
    let bath = (bathrmnum === 1) ? bathrmnum + ' bath' : bathrmnum + ' baths';

    if (type === 'Entire place') {
      highlights.push('Entire apartment');
      highlights.push(guest + '\t' + bedrm + '\t' + bed + '\t' + bath);
    } else if (type === 'Private room') {
      highlights.push('Private room in house');
      highlights.push(guest + '\t' + bedrm + '\t' + bed + '\t' + bath);
    } else if (type === 'Hotel room') {
      highlights.push('Private room in hostel');
      highlights.push(guest + '\t' + bedrm + '\t' + bed + '\t' + bath);
    } else if (type === 'Shared room') {
      let sharebath; 
      if (bathrmnum === 0) {
        sharebath = null;
      } else if (bathrmnum === 1) {
        sharebath = bathrmnum +' bath'
      } else if (bathrmnum > 1) {  
        sharebath = bathrmnum +' baths'
      }
      
      highlights.push('Shared room in house');
      highlights.push(guest + '\t' + bedrm + '\t' + bed + '\t' + sharebath);
    }
    
    let highlightsoptions = [host_name + ' is a Superhost', 'Sparkling clean', 
    'Self check-in', 'Great location','Great check-in experience'];
    highlightsoptions.sort(() => Math.random()-0.5);
    highlightsoptions.slice(0,3)

    for (let k = 0; k < 3; k++){
      highlights.push(faker.lorem.sentence());
    }

    let general = 'General: ' + faker.lorem.paragraphs();
    let theSpace = 'The space: ' + faker.lorem.paragraphs();
    let guestAccess = 'Interaction with guests: ' + faker.lorem.paragraphs();
    let otherThingsToNote = 'Other things to note: ' + faker.lorem.paragraphs();
    let licensenum = '';

    for (var m = 0; m < 7; m++){
      licensenum += faker.random.number({ min: 0, max: 9 })
    }

    let licenseRegistration = 'STR-' + licensenum;

    let data = `${listings_id} | ${title} | ${location} | ${host_name} | ${host_pic} 
    | ${type} | ${bedrmnum} | ${bathrmnum} | ${guestmax} | ${beds} | ${bednum} 
    | ${highlights} | ${general} | ${theSpace} | ${guestAccess} | ${otherThingsToNote} 
    | ${licenseRegistration} \n`;
    
    stream.write(data);

    listings_id++;
    console.log(count);
    count++;
  }
}

generateListingsData();

const generateAmenities = () => {
  const stream = fs.createWriteStream('seed_amenities.csv');
  let amenities_id = 1;
  let amenity_list = ['Wifi', 'TV', 'Cable TV', 'Iron', 'Dryer', 'Hot water', 'Washer', 
  'Heating', 'Essentials', 'Laptop friendly workspace', 'Air conditioning', 'Baby bath', 
  'Kid books and toys', 'Crib', 'High chair', 'Room-darkening shades', 'Window guards',
  'Free parking on premises', 'Kitchen', 'Breakfast', 'Cooking basics', 'Private entrance', 
  'Host greets you', 'Hangers', 'Hair dryer', 'Shampoo', 'Bed linens', 
  'Extra pillows and blankets', 'Luggage dropoff allowed', 'Long term stays allowed', 
  'Fire extinguisher', 'First aid kit', 'Smoke detector', 'Carbon monoxide detector'];

  let amenity_categories = {
    basic: ['Wifi', 'TV', 'Cable TV', 'Iron', 'Dryer', 'Hot water', 'Washer', 
    'Heating', 'Essentials', 'Laptop friendly workspace', 'Air conditioning'],
    familyFeatures: ['Baby bath', 'Kid books and toys', 'Crib', 'High chair', 
    'Room-darkening shades', 'Window guards'],
    facilities: ['Free parking on premises'],
    dining: ['Kitchen', 'Breakfast', 'Cooking basics'],
    guestAccess: ['Private entrance', 'Host greets you'],
    bedAndBath: ['Hangers', 'Hair dryer', 'Shampoo', 'Bed linens', 
    'Extra pillows and blankets'],
    logistics: ['Luggage dropoff allowed', 'Long term stays allowed'],
    safetyFeatures: ['Fire extinguisher', 'First aid kit', 'Smoke detector', 
    'Carbon monoxide detector']
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
    stream.write(data);
    amenities_id++;
  }
}

generateAmenities();

const generateListingsAmenities = () => {
  const stream = fs.createWriteStream('seed_listings_amenities.csv');  
  let listings_amenities_id = 1;
  let listings_id = 1;
  let amenities_id = 1;
  let amenity_list = ['Wifi', 'TV', 'Cable TV', 'Kitchen', 'Iron', 'Dryer', 
  'Washer', 'Hangers', 'Heating', 'Essentials', 'Laptop friendly workspace',
  'Hot water', 'Air conditioning', 'Free parking on premises'];

  // loop through listings
  while (listings_id <= 10000) {
    // loop through amenities
    while (amenities_id <= amenity_list.length) {
    //   let data = `${listings_amenities_id} | ${listings_id} | ${amenities_id}\n`;
      
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

      let data = `${listings_amenities_id} | ${listings_id} | ${amenities_id} | ${offers} | ${additionalInfo}\n`;
      stream.write(data);
      
      amenities_id++;
      listings_amenities_id++;
    }
    amenities_id = 1;
    listings_id++;
  }
}

generateListingsAmenities();