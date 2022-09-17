const BaseService = require("./BaseService");
const Exception = require("../models/Exception");
const UserUtils = require("../utils/user");
const {generateHash}  = require("../library/auth");
const RESPONSE_MESSAGES = require("../constants/ResponseMessages");
const STATUS_CODES = require("../constants/StatusCodes");
const userModel = require('../models/user');

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

            // returning OTP
            return otp;
        }
        catch(err){
            // returning the error to the controller
            throw err;
        }
        
        
    }


    async signUp(data) {
        try{

            // Validating the parameters which are mandatory for the singup
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
                IS_PROVIDER: data.isProvider,
                ACTIVE_IND: true
            }

            console.log(">>>>>>>>>>>> Inserting user in Database", userObject)

            // Calling user model to insert the user data in database
            let newUser = await userModel.insertUser(userObject);

            console.log(">>>>>>>>>>>>> NEW USER: ", newUser);

            newUser[0].token = await this.userUtils.createToken(newUser);

            // returning new user which is just created
            return newUser[0];

        }
        catch(err){
            throw err;
        }

    }


    async login(data) {

        try{

            // Validating the parameters which are mandatory for the login
            let [paramsValidated, err] = this.userUtils.validateLoginParams(data);
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            // Getting user by it email from DB
            let user = await this.userUtils.getUserByEmail(data.email);
            if (!user){
                console.log("No user found against email: ", data.email);
                throw new Exception(STATUS_CODES.NOT_FOUND, RESPONSE_MESSAGES.NO_USER_FOUND);
            }

            console.log(">>>>> User Found: ", JSON.stringify(user));

            // Matching old password from DB
            let passwordVerified = await this.userUtils.validatePassword(data.password, user.PASSWORD);
            if (!passwordVerified){
                console.log("Invalid Password");
                throw new Exception(STATUS_CODES.SUCCESS, RESPONSE_MESSAGES.INVALID_PASSWORD);
            }

            // Creting login token and returning it
            user.token = await this.userUtils.createToken(user);

            return user;

        }
        catch (err){
            throw err;
        }
    }


    async changePassword(data) {
        try{
            
            // Validating the parameters which are mandatory for the change password API
            let [paramsValidated, err] = this.userUtils.validateChangePassParams(data);
            if (!paramsValidated){
                throw new Exception(STATUS_CODES.BAD_REQUEST, err)
            }

            // Getting user from DB by user id
            let user = await this.userUtils.getUserById(data.userID);
            if (!user){
                console.log("Invalid user");
                throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.NO_USER_FOUND);
            }

            //Verifying whether old password provided is correct or not
            let oldPasswordVerified = await this.userUtils.validatePassword(data.oldPassword, user.PASSWORD);
            if (!oldPasswordVerified){
                console.log("Password not matched");
                throw new Exception(STATUS_CODES.SUCCESS, RESPONSE_MESSAGES.PASSWORD_NOT_MATCHED);
            }

            // Calculating hash value of new password
            let hashedPassword = await generateHash(data.newPassword);

            // Updating new password in database
            await this.userUtils.updateById(data.userID, {PASSWORD: hashedPassword});

            return true;

        }
        catch(err){
            throw err;
        }
    }


    async sendCode(data){
       
        try{
            // Saving mobile number provided in the request in a let variable
            let userExists = await this.userUtils.checkCellNo(data.mobile);
            if (userExists){
                //todo call otp service once integrated
                let code = 74596;
                return code;
            }

            console.log("No user found");
            // Throwing an error if user is not found
            throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.NO_USER_FOUND)
        }
        catch (err){
            throw err;
        }
    }


    async forgetPassword(data){
        try{

            // Saving password and mobile in a variable
            let newPassword = data.newPassword;
            let mobile = data.mobile;

            // Generating hash value of the new password provided
            let hashedPassword = await generateHash(newPassword);

            // Updating the new password in the database
            await this.userUtils.updateByMobile(mobile, {PASSWORD: hashedPassword});

            return true;
        }
        catch (err){
            throw err;
        }
    }


    async updateProfile(data) {
        try{

             // Validating the parameters which are mandatory for the singup
             let [paramsValidated, err] = this.userUtils.validateUpdateProfileParams(data);
             if (!paramsValidated){
                 throw new Exception(STATUS_CODES.BAD_REQUEST, err)
             }
 
             // checking email if it exist in database or not
             console.log(">>>>>>>>>> Checking email");
             let emailExists = await this.userUtils.checkEmailById(data.email, data.id);
             if(emailExists){
                 console.log("Provided email already exists");
                 throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.ERROR_EMAIL_EXISTS);
             }
 
             // checking cell number if it exist in database or not
             console.log(">>>>>>>>>> Checking cell number");
             let cellNoExists = await this.userUtils.checkCellNoById(data.cellNumber, data.id);
             if(cellNoExists){
                 console.log("Provided cell number already exists");
                 throw new Exception(STATUS_CODES.BAD_REQUEST, RESPONSE_MESSAGES.ERROR_CELLNO_EXISTS);
             }

             let userObject = {
                FIRST_NAME: data.firstName,
                LAST_NAME: data.lastName,
                EMAIL: data.email,
                CELL_NUMBER: data.cellNumber,
                IS_PROVIDER: data.isProvider,
            }

            console.log(">>>>>>>>>>>> Updating user in Database", userObject)

            // Calling user model to update the user data in database
            let updatedUser = await userModel.updateUser(userObject, data.id);

            console.log(">>>>>>>>>>>>> Updated USER: ", updatedUser);

            // returning updated user
            return updatedUser[0];

        }
        catch (err){
            throw err;
        }

    }


    async getUserById(id) {
        try{

            let user = await userModel.getUserById(id);

            console.log(user);

            return user ?? null;

        }
        catch (err){
            throw err;
        }

    }



}

module.exports = UserService;