const BaseController  = require("./BaseController");

class UserController extends BaseController{
    constructor() {super()}

    async signUp(req, res, next) {
        
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SIGNUP API <<<<<<<<<<<<<<<<<<<<<<<<<");


        res.success(200, 'Success');

    }

}


module.exports =  UserController;