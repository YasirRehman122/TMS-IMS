const CommonUtils = require("./common");
const Helper = require('../helper/helper');

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

}

module.exports = UserUtils;