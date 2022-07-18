const BaseService = require("./BaseService");
const userModle = require("../models/user");
const USER_UTILS = require('../utils/user');
const Exception = require("../models/Exception");
const UserUtils = require("../utils/user");
const RESPONSE_MESSAGES = require("../constants/ResponseMessages");
const STATUS_CODES = require("../constants/StatusCodes");

class UserService extends BaseService{
    constructor() {
        super()

        this.userUtils = new USER_UTILS();
    }

    async checkEmail(data) {
        try{

            let email = await userModle.getEmail(data.email);
            if(email){
                console.log("Provided email already exists");
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.ERROR_EMAIL_EXISTS);
            }

            // calls otp service to get OTP

            let otp = 45879;

            return otp;
        }
        catch(err){
            throw err;
        }
        
        
    }


    async signUp(data) {
        try{

            let [paramsValidated, err] = this.userUtils.validateSignUpParams(data);
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            return true;


        }
        catch(err){
            throw err;
        }

    }
}

module.exports = UserService;