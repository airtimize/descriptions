const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'test' });
const Uuid = require('cassandra-driver').types.Uuid;

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
      callback(err);
    } else {
      callback(null, result.rows);
    }
  })
};

const addDesc = (id, callback) => {
  const newId = Uuid.random();
  client.execute(`INSERT INTO test.test_descs (listings_id, bath_rm_num, bed_num, bed_rm_num, beds, 
  descriptions_id, general, guest_max, highlights, host_name, host_pic, listing_type, location, 
  title) VALUES (${id}, 3, 2, 1, '1 bed', ${newId}, 'Expedita libero inventore esse sunt consectetur doloribus iusto. Rem dolores tenetur corporis expedita nihil rem sed nemo quis. Porro ipsa nesciunt. Animi dolores ad quas. Cumque iusto inventore iusto praesentium aut nesciunt accusantium at. Accusantium totam est voluptatem aspernatur quidem recusandae dolor. Qui illo aut labore. Sed sit nulla quisquam unde. Veritatis cumque excepturi. Quas maiores est vel perferendis consequatur dolorem quisquam.', 
  2, {'additional_info': 'null', 'category': 'basic', 'offers': 'false'}, 'Sally', 'http://lorempic.com/80/80', 'Island', 'Hawaii', 'A lovely place');`, 
  (err) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, 'New description successfully added!');
    }
  });
};

const addAmen = (id, callback) => {
  const newAmenId = Uuid.random();
  client.execute(`INSERT INTO test.test_amen (listings_id, name, additional_info, amenities_id, category) 
  VALUES (${id}, 'Umbrellas', 'For unexpected rainy weather', ${newAmenId}, 'Essentials');`, 
  (err) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, 'New amenity successfully added!');
    }
  })
};

module.exports = {
  client,
  findDesc,
  findAmen,
  addDesc,
  addAmen
};