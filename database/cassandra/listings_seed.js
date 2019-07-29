// const db = require('./pg_index.js');
const faker = require('faker');
const fs = require('fs');

const stream = fs.createWriteStream('./seedingFiles/seed_listings.csv');

const write = () => {
  return new Promise((resolve) => {
    stream.once('drain', resolve)
  })
}

const generateListingsData = async () => {
  let listings_id = 1;

  let headers = 'listings_id|air_conditioning|bath_rm_num|bed_num|bed_rm_num|beds|cable_tv|dryer|essentials|general|guest_max|heating|highlights|host_name|host_pic|hot_water|iron|laptop_friendly_workspace|listing_type|location|title|tv|washer|wifi';
  stream.write(headers);

  while (listings_id <= 10000000) {
    let header = faker.lorem.sentence(3);
    let title =  header.slice(0, header.length-1);
    let location = faker.address.city();
    let host_name = faker.name.firstName();
    let host_pic = faker.image.imageUrl();

    let typeOptions = ['Entire place','Private room','Hotel room','Shared room'];
    let typeIndex = Math.floor(Math.random() * 4);
    let type = typeOptions[typeIndex];

    let bedrmnum = 0;
    let bathrmnum = 0;
    let guestmax = 0;
    let beds = [];
    let bednum = 0;

    const generateDetail = (listingType) => {
      let bedoptions = ['1 queen bed','1 single bed','1 king bed','2 single beds'];
      if (listingType === 'Entire place') {
        let bedcounter = 0;
        bedrmnum = Math.floor(Math.random() * (7 - 3)) + 3;
        bathrmnum = Math.floor(Math.random() * ((bedrmnum + 1) - 1)) + 1;
        guestmax = Math.floor(Math.random() * ((bedrmnum * 2 + 3) - bedrmnum)) + bedrmnum;

        for (let i = 0; i < bedrmnum; i++) {
          let currBedoption = bedoptions[Math.floor(Math.random() * bedoptions.length)];
          bedcounter += parseInt(currBedoption.slice(0,1));
          beds.push(currBedoption);
        }

        bednum = bedcounter;
      } else if (listingType === 'Private room') {
        bedrmnum = 1;
        bathrmnum = 1;
        guestmax = Math.floor(Math.random() * (4 - 1)) + 1;
        let bedoption = bedoptions[Math.floor(Math.random() * bedoptions.length)];
        beds = [bedoption];
        bednum = parseInt(bedoption.slice(0,1));

      } else if (listingType === 'Hotel room') {
        let bedcounter = 0;
        bedrmnum = Math.floor(Math.random() * (4 - 1)) + 1;
        bathrmnum = Math.floor(Math.random() * ((bedrmnum + 1) - 1)) + 1;
        guestmax = Math.floor(Math.random() * ((bedrmnum * 2 + 3) - bedrmnum)) + bedrmnum;
          
        for (let j = 0; j < bedrmnum; j++) {
          let currBedoption = bedoptions[Math.floor(Math.random()*bedoptions.length)]
          bedcounter += parseInt(currBedoption.slice(0,1))
          beds.push(currBedoption)
        }

        bednum = bedcounter;

      } else if (listingType === 'Shared room'){
        bedrmnum = 1;
        bathrmnum = Math.floor(Math.random() * 1);
        guestmax = Math.floor(Math.random() * (5 - 1)) + 1;
        let bedoptionsShared = ['1 queen bed','1 single bed','2 single beds'];
        let bedoption = bedoptionsShared[Math.floor(Math.random()*bedoptionsShared.length)]
        beds = beds.push(bedoption);
        bednum = parseInt(bedoption.slice(0,1));
      }
    }

    generateDetail(type);

    let highlights = {};
    let guest = (guestmax === 1) ? guestmax + ' guest': guestmax + ' guests';
    let bedrm = (bedrmnum === 1) ? bedrmnum + ' room' : bedrmnum + ' rooms';
    let bed = (bednum === 1) ? bednum + ' bed' : bednum + ' beds';
    let bath = (bathrmnum === 1) ? bathrmnum + ' bath' : bathrmnum + ' baths';

    if (type === 'Entire place') {
      highlights['Entire apartment'] = guest + '\t' + bedrm + '\t' + bed + '\t' + bath;
    } else if (type === 'Private room') {
      highlights['Private room in house'] = guest + '\t' + bedrm + '\t' + bed + '\t' + bath;
    } else if (type === 'Hotel room') {
      highlights['Private room in hostel'] = guest + '\t' + bedrm + '\t' + bed + '\t' + bath;
    } else if (type === 'Shared room') {
      let sharebath; 
      if (bathrmnum === 0) {
        sharebath = null;
      } else if (bathrmnum === 1) {
        sharebath = bathrmnum +' bath'
      } else if (bathrmnum > 1) {  
        sharebath = bathrmnum +' baths'
      }
      
      highlights['Shared room in house'] = guest + '\t' + bedrm + '\t' + bed + '\t' + sharebath;
    }
    
    let highlightOptions = {
      'is a Superhost': 'Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.',
      'Sparkling clean': ' recent guests said this place was sparkling clean.',
      'Self check-in': 'Check yourself in with the lockbox.',
      'Great location': ' of recent guests gave the location a 5-star rating.',
      'Great check-in experience': '% of recent guests gave the check-in process a 5-star rating.'
    }

    let highlightOptionsKeys = Object.keys(highlightOptions);
    let previousIndexes = [];

    for (let k = 0; k < 3; k++){
      let randomIndex = Math.floor(Math.random() * 5);
      let key = highlightOptionsKeys[randomIndex];
      if (!previousIndexes.includes(randomIndex)) {
        highlights[key] = highlightOptions[key];
        previousIndexes.push(randomIndex);
      } else if (previousIndexes.includes(randomIndex)) {
        k--;
      }
    }

    let highlightKeys = Object.keys(highlights);
    let highlight_list = '{';

    for (let l = 0; l < highlightKeys.length; l++) {
      highlight_list = highlight_list + `'${highlightKeys[l]}': '${highlights[highlightKeys[l]]}'`;

      if (l !== highlightKeys.length-1) {
        highlight_list = highlight_list + ', ';
      }
    }

    highlight_list = highlight_list + '}';

    let paragraphOptions = [`Dolor ab magnam doloribus praesentium sequi veritatis modi. Similique velit sit maxime id rerum dicta. Saepe animi perspiciatis quam.`, `Facere aut cum. Exercitationem a sed laboriosam tempore amet ut accusantium. Amet sit esse qui debitis ullam optio asperiores.`, `Ut quae quis voluptatum asperiores atque rerum voluptas quia hic. Odit dolores sed. Nisi id tenetur aut ipsum facilis perspiciatis eius.`, `Ipsum totam magnam doloremque nam consequatur occaecati. Debitis non aspernatur. Est nesciunt magni commodi enim aspernatur et.`, `Rem beatae totam eveniet sit. Voluptatem quidem necessitatibus ducimus ullam exercitationem aperiam quo qui quia. Consequatur cumque dolor quidem et aut provident amet esse.`];
    let paragraphIndex = Math.floor(Math.random() * 5);
    let general = 'General: ' + paragraphOptions[paragraphIndex];

    let amenity_list = ['wifi', 'tv', 'cable_tv', 'iron', 'dryer', 'hot_water', 'washer', 
    'heating', 'essentials', 'laptop_friendly_workspace', 'air_conditioning'];

    let amenity = {};

    for (let k = 0; k < amenity_list.length; k++) {
      let offerDecision = Math.floor(Math.random() * 2);
      let offers = offerDecision === 1 ? true : false;
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

      let amenityObj = {
        category: 'basic',
        offers: offers,
        additional_info: additionalInfo
      }

      amenity[amenity_list[k]] = `{'category': '${amenityObj.category}', 'offers': '${amenityObj.offers}', 'additional_info': '${amenityObj.additional_info}'}`;

      if (k === amenity_list.length-1) {
        stream.write('\n');
      }
    }

    let data = `${listings_id}|${amenity.air_conditioning}|${bathrmnum}|${bednum}|${bedrmnum}|${beds}|${amenity.cable_tv}|${amenity.dryer}|${amenity.essentials}|${general}|${guestmax}|${amenity.heating}|${highlight_list}|${host_name}|${host_pic}|${amenity.hot_water}|${amenity.iron}|${amenity.laptop_friendly_workspace}|${type}|${location}|${title}|${amenity.tv}|${amenity.washer}|${amenity.wifi}`;

    let canWrite = stream.write(data);
    
    if (listings_id % 500000 === 0) {
      console.log(listings_id);
    }

    if (!canWrite) {
      await write();
    }

    listings_id++;
  }
}

generateListingsData();
