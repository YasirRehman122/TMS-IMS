/**
 * This is a boiler plate for knexfile.js. It's a builtin file and created automatically when knexjs is installed
 */

 require('dotenv').config();

 // Update with your config settings.
 
 /**
  * @type { Object.<string, import("knex").Knex.Config> }
  */
 module.exports = {
 
   development: {
     client: 'postgresql',
     connection: {
       host: process.env.DB_HOST,
       database: process.env.DB_NAME,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       charset: 'utf8'
     },
     pool: {
       min: 2,
       max: 10
     },
     migrations: {
       directory: __dirname + '/src/database/migrations',
       tableName: 'ims_migrations',
     },
 
     seeds: {
       directory: __dirname + '/src/database/seeders'
     }
   },
 
   staging: {
     client: 'postgresql',
     connection: {
       host: process.env.DB_HOST,
       database: process.env.DB_NAME,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       charset: 'utf8'
     },
     pool: {
       min: 2,
       max: 10
     },
     migrations: {
       tableName: 'ims_migrations',
       directory: __dirname + '/src/database/migrations'
     },
 
     seeds: {
       directory: __dirname + '/src/database/seeders'
     }
 },
 
 production: {
   client: 'postgresql',
   connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: 'utf8',
    ssl:{
      rejectUnauthorized: false
    }
  },
   pool: {
     min: 2,
     max: 10
   },
   migrations: {
     tableName: 'ims_migrations',
     directory: __dirname + '/src/database/migrations'
   },
 
   seeds: {
     directory: __dirname + '/src/database/seeders'
   }
 }
 };