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
  let hosts_id = 1;

  while (listings_id <= 10000000) {
    let header = faker.lorem.sentence(3);
    let title =  header.slice(0, header.length-1);
    let location = faker.address.city();

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
        let bedRandomIndex = Math.floor(Math.random() * 3);
        bedoption = bedoptionsShared[bedRandomIndex];
        beds = [bedoption];
        bednum = parseInt(bedoption.slice(0,1));
      }
    }

    generateDetail(type);

    let paragraphOptions = [`Dolor ab magnam doloribus praesentium sequi veritatis modi. Similique velit sit maxime id rerum dicta. Saepe animi perspiciatis quam.`, `Facere aut cum. Exercitationem a sed laboriosam tempore amet ut accusantium. Amet sit esse qui debitis ullam optio asperiores.`, `Ut quae quis voluptatum asperiores atque rerum voluptas quia hic. Odit dolores sed. Nisi id tenetur aut ipsum facilis perspiciatis eius.`, `Ipsum totam magnam doloremque nam consequatur occaecati. Debitis non aspernatur. Est nesciunt magni commodi enim aspernatur et.`, `Rem beatae totam eveniet sit. Voluptatem quidem necessitatibus ducimus ullam exercitationem aperiam quo qui quia. Consequatur cumque dolor quidem et aut provident amet esse.`];
    let paragraphIndex = Math.floor(Math.random() * 5);
    let general = 'General: ' + paragraphOptions[paragraphIndex];

    // let data = `${listings_id} | ${title} | ${location} | ${host_name} | ${host_pic} | ${type} | ${bedrmnum} | ${bathrmnum} | ${guestmax} | ${beds} | ${bednum} | ${highlights} | ${general}\n`;
    let data = `${listings_id}|${title}|${location}|${bedrmnum}|${bathrmnum}|${guestmax}|${beds}|${bednum}|${general}|${hosts_id}|${typeIndex+1}\n`;
    
    if (listings_id % 500000 === 0) {
      console.log(listings_id);
    }

    let canWrite = stream.write(data);
    
    if (!canWrite) {
      await write();
    }

    listings_id++;
    hosts_id++;
  }
}

generateListingsData();
