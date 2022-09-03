const db = require('../../database/dbObject');

// Checking if the provided email exists in DB or not
const getEmail = async (email) => db('USER').select('ID').where({EMAIL: email}).first();

// Get user from database through cell number
const getCellNo = async (cellNo) => db('USER').select('ID').where({CELL_NUMBER: cellNo}).first();

// inserts user in database
const insertUser = async (dataObj) => db('USER').insert(dataObj).returning('*');

// Get user from database through email
const getUserByEmail = async (email) => db.select('*').from('USER').where({EMAIL: email}).first();

// Getting user from DB by it user id
const getUserById = async (id) => db.select('*').from('USER').where({ID: id}).first();

// Updating user by user id
const updateById = async (id, obj) => db("USER").where({ID: id}).update(obj);

// Updating user by cell number
const updateByMobile = async (mobile, obj) => db("USER").where({CELL_NUMBER: mobile}).update(obj);

const getEmailById = async (email, id) => db('USER').select('ID').where({EMAIL: email}).whereNot({ID: id}).first(); 

const getCellNoById = async (cell, id) => db('USER').select('ID').where({CELL_NUMBER: cell}).whereNot({ID: id}).first() 

const updateUser = async (obj, id) => db('USER').where({ID: id}).update(obj).returning('*');


module.exports = {
    getEmail,
    getCellNo,
    insertUser,
    getUserByEmail,
    getUserById,
    updateById,
    updateByMobile,
    getEmailById,
    getCellNoById,
    updateUser
}