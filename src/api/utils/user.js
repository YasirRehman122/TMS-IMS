const CommonUtils = require("./common");
const Helper = require('../helper/helper');
const userModel = require('../models/user');
const {verifyHash} = require('../library/auth');
const {generateToken} = require('../library/auth');

class UserUtils extends CommonUtils{
    constructor() {super()}

    /**
     * Veerifies parameters required for signup
     * @param {*} data 
     * @returns 
     */
    validateSignUpParams(data){

        // list of paramters taht are mandatory for signup
        let requiredParams = ['firstName', 'lastName', 'email', 'cellNumber', 'password', 'cnic', 'isProvider'];

        // calling helper functioj which will validate of all the above mentioned params are there or not
        let [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        // If any param is missing then returning error message
        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    
    /**
     * Veerifies parameters required for login
     * @param {*} data 
     * @returns 
     */
    validateLoginParams(data){

        let requiredParams = ['email','password'];

        let [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    
    /**
     * Veerifies parameters required for change password
     * @param {*} data 
     * @returns 
     */
    validateChangePassParams(data){

        let requiredParams = ['userID', 'oldPassword','newPassword'];

        let [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    /**
     * Checks email in the database
     * @param {*} email 
     * @returns 
     */
    async checkEmail(email){

        // Getting email from DB
        let userEmail = await userModel.getEmail(email);

        // Returning email if found in DB otherwise null
        return userEmail ?? false;
    }

     /**
     * Checks cell number in the database
     * @param {*} email 
     * @returns 
     */
    async checkCellNo(cellNumber){

        // Getting cell number from DB
        let cellNo = await userModel.getCellNo(cellNumber);

        // Returning cell number if found in DB otherwise null
        return cellNo ?? false;
    }

    async getUserByEmail(email){

        let user = await userModel.getUserByEmail(email);

        return user ?? null;
    }

    async getUserById(id) {

        let user = await userModel.getUserById(id);

        return user ?? null;
    }

    async validatePassword(password, hashedPassword){
        return await verifyHash(password, hashedPassword)
    }

    /**
     * Generates login token
     * @param {*} user 
     * @returns logintoken
     */
    async createToken(user){

        // Creating object that will be used in creating login token
        let userObj = {id: user.id};

        return await generateToken(userObj);
    }

    // Updating the user in the Database using user id 
    async updateById(userId, obj) {

        await userModel.updateById(userId, obj);
    }

    /**
     * This fucntion calls database to save the new password
     * @param {*} mobile 
     * @param {*} obj 
     */
    async updateByMobile(mobile, obj){
        
        await userModel.updateByMobile(mobile, obj);
    }

}

module.exports = UserUtils;