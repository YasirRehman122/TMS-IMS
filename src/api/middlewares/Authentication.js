
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
    const authToken = (req.headers['Authorization'])?.toString().split(" ").pop();

    if (authToken) {

        try{
            // Verifying auth token using JWT library
            const decodedToken = JWT.verify(authorization, jwt.key)
            // consoling decoded token
            console.log(decodedToken)
        } 
        catch (err){
            // Returning error if token is not valid
            return res.error(err, RESPONSE_MESSAGE.UN_AUTHORIZED_USER, STATUS_CODE.UNAUTHORIZED);
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


