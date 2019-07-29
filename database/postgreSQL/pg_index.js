const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'airtimize',
  database: 'descriptions',
  password: ''
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