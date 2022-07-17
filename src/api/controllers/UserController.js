const BaseController  = require("./BaseController");

class UserController extends BaseController{
    constructor() {super()}

    async signUp(req, res, next) {
        
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SIGNUP API <<<<<<<<<<<<<<<<<<<<<<<<<");


        res.status(200).json({status: true});


    }

}


module.exports =  UserController;