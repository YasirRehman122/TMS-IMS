const  jwt = require('jsonwebtoken');
const config  = require('../../config/config');
const bcrypt = require("bcryptjs");
const token = config.jwt;


module.exports = {

    /**
     * Generating JET token
     * @param {*} obj 
     * @returns  token
     */
    generateToken: async (obj) => {
        
        return jwt.sign({obj}, token.key, {
            expiresIn: token.expiry, 
            algorithm: token.algo
        } );
    },

    /**
     * Generating hash value
     * @param {*} data 
     * @returns hashed value
     */
    generateHash: (data) =>  {
        return bcrypt.hash(data, 10);
    },


    /**
     * This function compares plain text with hash value provided
     * @param {*} text 
     * @param {*} hashValue 
     * @returns boolean (true / false)
     */
    verifyHash: async (text, hashValue) => {
        return await bcrypt.compare(text, hashValue)
    }
}