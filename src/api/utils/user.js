const CommonUtils = require("./common");
const Helper = require('../helper/helper');
const userModel = require('../models/user');

class UserUtils extends CommonUtils{
    constructor() {super()}

    validateSignUpParams(data){

        let requiredParams = ['firstName', 'lastName', 'email', 'cellNumber', 'password', 'cnic', 'isProvider'];

        let [paramsPresent, err] = Helper.paramsPresent(requiredParams, data);

        if (!paramsPresent && err){
            console.log(`Missing required parameter ${err}`);
            return [false, `Missing required parameter ${err}`];
        }

        return [true, null];
    }

    async checkEmail(email){

        let userEmail = await userModel.getEmail(email);

        return userEmail ?? false;
    }

    async checkCellNo(cellNumber){

        let cellNo = await userModel.getCellNo(cellNumber);

        return cellNo ?? false;
    }

}

module.exports = UserUtils;