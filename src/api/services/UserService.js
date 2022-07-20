const BaseService = require("./BaseService");
const Exception = require("../models/Exception");
const UserUtils = require("../utils/user");
const {generateHash}  = require("../library/auth");
const RESPONSE_MESSAGES = require("../constants/ResponseMessages");
const STATUS_CODES = require("../constants/StatusCodes");

class UserService extends BaseService{
    constructor() {
        super()

        this.userUtils = new UserUtils();
    }

    async checkEmailAndCell(data) {
        try{

            // checking email if it exist in database or not
            console.log(">>>>>>>>>> Checking email");
            let emailExists = await this.userUtils.checkEmail(data.email);
            if(emailExists){
                console.log("Provided email already exists");
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.ERROR_EMAIL_EXISTS);
            }

            // checking cell number if it exist in database or not
            console.log(">>>>>>>>>> Checking cell number");
            let cellNoExists = await this.userUtils.checkCellNo(data.cellNumber);
            if(cellNoExists){
                console.log("Provided cell number already exists");
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.ERROR_CELLNO_EXISTS);
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

            // checking email if it exist in database or not
            console.log(">>>>>>>>>> Checking email");
            let emailExists = await this.userUtils.checkEmail(data.email);
            if(emailExists){
                console.log("Provided email already exists");
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.ERROR_EMAIL_EXISTS);
            }

            // checking cell number if it exist in database or not
            console.log(">>>>>>>>>> Checking cell number");
            let cellNoExists = await this.userUtils.checkCellNo(data.cellNumber);
            if(cellNoExists){
                console.log("Provided cell number already exists");
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.ERROR_CELLNO_EXISTS);
            }

            // Converting plain text password into hash
            let hashedPassword = await generateHash(data.password);

            // Preparing data object to save in database
            let userObject = {
                FIRST_NAME: data.firstName,
                LAST_NAME: data.lastName,
                EMAIL: data.email,
                CELL_NUMBER: data.cellNumber,
                PASSWORD: hashedPassword,
                CNIC: data.cnic,
                IS_PROVIDER: data.isProvider,
                ACTIVE_IND: true
            }

            console.log(">>>>>>>>>>>> Inserting user in Database", userObject)

            let newUser = await userModel.insertUser(userObject);

            console.log(">>>>>>>>>>>>> NEW USER: ", newUser);

            return newUser[0];


        }
        catch(err){
            throw err;
        }

    }
}

module.exports = UserService;