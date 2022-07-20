const  jwt = require('jsonwebtoken');
const config  = require('../../config/config');
const bcrypt = require("bcryptjs");
const token = config.jwt;


module.exports = {

    generateToken: (obj) => {
        return jwt.sign({obj}, token.key, {expiresIn: token.expiry} );
    },

    generateHash: (data) =>  {
        return bcrypt.hash(data, 10);
    }
}