//This is boiler plate code for configuration of database within our application
const dbConfig = require("../config/db");
const knex = require('knex')
const setupPaginator = require('./knexPaginator');

let db = knex({
  debug: process.env.NODE_ENV == "production" ? false : true,
  // debug: true,
  client: dbConfig[process.env.NODE_ENV].dialect,
  // connection: {
  //   host: dbConfig[process.env.NODE_ENV].host,
  //   user: dbConfig[process.env.NODE_ENV].username,
  //   password: dbConfig[process.env.NODE_ENV].password,
  //   database: dbConfig[process.env.NODE_ENV].database,
  //   // port: 5444,
  //   pool: {
  //     autostart: true,
  //     max: 10,
  //     min: 2,
  //     propagateCreateError: false
  //   }
  // },
  connection: 'postgres://pwsxdtrptmktqf:f2a5fb802c52f4f489b39395dccd39aea0b981f6dd95c71f93a24705dc25ee45@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/d2j5ua1h9mn45r'
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
