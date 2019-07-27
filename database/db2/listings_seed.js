// const db = require('./pg_index.js');
const faker = require('faker');
const fs = require('fs');

const stream = fs.createWriteStream('./seedingFiles/test_seed_listings.csv');

const write = () => {
  return new Promise((resolve) => {
    stream.once('drain', resolve)
  })
}

const generateListingsData = async () => {
  let listings_id = 1;

  while (listings_id <= 10) {
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

        let bednum = bedcounter;
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

    let highlights = [];
    let guest = (guestmax === 1) ? guestmax + ' guest': guestmax + ' guests';
    let bedrm = (bedrmnum === 1) ? bedrmnum + ' room' : bedrmnum + ' rooms';
    let bed = (bednum === 1) ? bednum + ' bed' : bednum + ' beds';
    let bath = (bathrmnum === 1) ? bathrmnum + ' bath' : bathrmnum + ' baths';

    if (type === 'Entire place') {
      highlights.push('{Entire apartment');
      highlights.push(guest + '\t' + bedrm + '\t' + bed + '\t' + bath);
    } else if (type === 'Private room') {
      highlights.push('{Private room in house');
      highlights.push(guest + '\t' + bedrm + '\t' + bed + '\t' + bath);
    } else if (type === 'Hotel room') {
      highlights.push('{Private room in hostel');
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
      
      highlights.push('{Shared room in house');
      highlights.push(guest + '\t' + bedrm + '\t' + bed + '\t' + sharebath);
    }
    
    let highlightsoptions = [host_name + ' is a Superhost', 'Sparkling clean', 
    'Self check-in', 'Great location', 'Great check-in experience'];
    highlightsoptions.sort(() => Math.random()-0.5);
    highlightsoptions.slice(0,3)

    let sentenceOptions = ['Velit voluptate iusto.', 'Et dolorum doloremque.', 'Qui corrupti ut.',
    'In adipisci ea.', 'Ipsam dolores rerum.'];
    sentenceOptions.sort(() => Math.random()-0.5);
    sentenceOptions.slice(0,3);

    for (let k = 0; k < 3; k++){
      currentHighlightOption = highlightsoptions[k];
      currentSentenceOption = sentenceOptions[k];

      if (k === 2) {
        currentSentenceOption = currentSentenceOption + '}';
      } 

      highlights.push(currentHighlightOption);
      highlights.push(currentSentenceOption);
    }

    let paragraphOptions = [`Dolor ab magnam doloribus praesentium sequi veritatis modi. Similique velit sit maxime id rerum dicta. Saepe animi perspiciatis quam.`, `Facere aut cum. Exercitationem a sed laboriosam tempore amet ut accusantium. Amet sit esse qui debitis ullam optio asperiores.`, `Ut quae quis voluptatum asperiores atque rerum voluptas quia hic. Odit dolores sed. Nisi id tenetur aut ipsum facilis perspiciatis eius.`, `Ipsum totam magnam doloremque nam consequatur occaecati. Debitis non aspernatur. Est nesciunt magni commodi enim aspernatur et.`, `Rem beatae totam eveniet sit. Voluptatem quidem necessitatibus ducimus ullam exercitationem aperiam quo qui quia. Consequatur cumque dolor quidem et aut provident amet esse.`];
    let paragraphIndex = Math.floor(Math.random() * 5);
    let general = 'General: ' + paragraphOptions[paragraphIndex];

    let data = `${listings_id} | ${title} | ${location} | ${host_name} | ${host_pic} | ${type} | ${bedrmnum} | ${bathrmnum} | ${guestmax} | ${beds} | ${bednum} | ${highlights} | ${general}\n`;
    
    if (listings_id % 1 === 0) {
      console.log(listings_id);
    }

    let canWrite = stream.write(data);
    
    if (!canWrite) {
      await write();
    }

    listings_id++;
  }
}

generateListingsData();
