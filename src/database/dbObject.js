//This is boiler plate code for configuration of database within our application
const dbConfig = require("../config/db");
const knex = require('knex')
const setupPaginator = require('./knexPaginator');

let db = knex({
  debug: process.env.NODE_ENV == "production" ? false : true,
  // debug: true,
  client: dbConfig[process.env.NODE_ENV].dialect,
  connection: {
    host: dbConfig[process.env.NODE_ENV].host,
    user: dbConfig[process.env.NODE_ENV].username,
    password: dbConfig[process.env.NODE_ENV].password,
    database: dbConfig[process.env.NODE_ENV].database,
<<<<<<< HEAD
  //   ssl: {    /* <----- Add SSL option */
  //   rejectUnauthorized: false,
  // },
=======
  //   ssl: {    /* <----- Add SSL option */
  //   rejectUnauthorized: false,
  // },
>>>>>>> 2de86c1732005301277e2e8aaa267dcb0e8300c4
    // port: 5444,
    pool: {
      autostart: true,
      max: 10,
      min: 2,
      propagateCreateError: false
    }
  },
  // ssl: {    /* <----- Add SSL option */
  //   rejectUnauthorized: false,
  // },
//   log: {
//     warn(message) {
//       logCat(`warn: ${JSON.stringify(message)}`);
//     },
//     error(message) {
//       logCat(`error: ${JSON.stringify(message)}`);
//     },
//     deprecate(message) {
//       logCat(`deprecate: ${JSON.stringify(message)}`);
//     },
//     debug(message) {
//       logCat(`debug: ${JSON.stringify(message)}`);
//     }
//   }
});
setupPaginator(db);
module.exports = db
