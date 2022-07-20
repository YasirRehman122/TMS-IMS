const db = require('../../database/dbObject');

const getEmail = async (email) => db('USER').select('ID').where({EMAIL: email}).first();

const getCellNo = async (cellNo) => db('USER').select('ID').where({CELL_NUMBER: cellNo}).first();

const insertUser = async (dataObj) => db('USER').insert(dataObj).returning('*');


module.exports = {
    getEmail,
    getCellNo,
    insertUser
}