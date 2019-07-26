const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'airtimize',
  database: 'listings',
  password: ''
})

pool.query('CREATE TABLE IF NOT EXISTS listings (id SERIAL PRIMARY KEY, title TEXT, location VARCHAR(30), host_name VARCHAR(25), host_pic TEXT, type TEXT, bed_rm_num INT, bath_rm_num INT, guest_max INT, beds TEXT, bed_num INT, highlights ARRAY, general TEXT, the_space TEXT, guest_access TEXT, interaction_with_guests TEXT, other_things_to_note TEXT, license_registration VARCHAR(30)', (err, result) => {
  console.log(err, result);
  pool.end();
})

pool.query('CREATE TABLE IF NOT EXISTS amenities (id SERIAL PRIMARY KEY, type VARCHAR(40))', (err, result) => {
  console.log(err, result);
  pool.end();
})
// pool.connect((err, client, release) => {
//   if (err) {
//     return console.log('CONNECTION ERROR', err.stack)
//   }

//   client.query('SELECT NOW()', (err, result) => {
//     release()
//     if (err) {
//       return console.log('QUERY ERROR', err.stack)
//     }

//     console.log(result.rows);
//   })
// })

module.exports = pool;