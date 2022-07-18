const db = require('../../database/dbObject');

const getEmail = async (email) => db('USER').select('ID').where({EMAIL: email}).first();


module.exports = {
    getEmail,
}