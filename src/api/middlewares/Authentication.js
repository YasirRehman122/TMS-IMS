
const JWT = require("jsonwebtoken");
const {jwt} = require('../../config/config');
const RESPONSE_MESSAGE = require("../constants/ResponseMessages");
const STATUS_CODE = require('../constants/StatusCodes');


/**
 * This is a middleware function responsible to check and validate token
 * @param {*} req Complete Request object
 * @param {*} res Complete Response object
 * @param {*} next nest object
 * @returns 
 */
module.exports = async (req, res, next) => {

    // Extracting auth token from request headers
    const authToken = (req.headers['authorization'])?.toString().split(" ").pop();

    if (authToken) {

        try{
            // Verifying auth token using JWT library
            var decodedToken = JWT.verify(authToken, jwt.key)
            // consoling decoded token
            console.log("DECODED TOKEN", decodedToken)
        } 
        catch (err){
            // Returning error if token is not valid
            return res.error(STATUS_CODE.UN_AUTHENTICATED, RESPONSE_MESSAGE.UN_AUTHENTICATED_USER);
        }

        // If token is valid then saving extracted data from token in request object
        req.user = decodedToken.user;
        
        // Calling next function to continue the flow 
        next();
        
    }
    else{
        // Returning error if token is not found in request headers
        console.log("User not authenticated");
        res.error(STATUS_CODE.UN_AUTHENTICATED, RESPONSE_MESSAGE.UN_AUTHENTICATED_USER);
    }
}


