// const db = require('./pg_index.js');
const faker = require('faker');
const fs = require('fs');

const stream = fs.createWriteStream('./seedingFiles/seed_hosts.csv');

const write = () => {
  return new Promise((resolve) => {
    stream.once('drain', resolve)
  })
}

const generateHostsData = async () => {
  let hosts_id = 1;

  while (hosts_id <= 10000000) {
    let host_name = faker.name.firstName();
    let host_pic = faker.image.imageUrl();

    let data = `${hosts_id}|${host_name}|${host_pic}\n`;
    
    if (hosts_id % 500000 === 0) {
      console.log(hosts_id);
    }

    let canWrite = stream.write(data);
    
    if (!canWrite) {
      await write();
    }

    hosts_id++;
  }
}

generateHostsData();