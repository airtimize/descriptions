const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'test' });

client.connect(function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Cassandra connected!');
  }
});

const findDesc = (id, callback) => {
  client.execute(`SELECT * FROM descriptions WHERE listings_id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      let data = result.rows[0];
      callback(null, data);
    }
  });
};

const findAmen = (id, callback) => {
  client.execute(`SELECT * FROM amenities WHERE listings_id = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, result.rows);
    }
  })
};

module.exports = {
  client,
  findDesc,
  findAmen
};