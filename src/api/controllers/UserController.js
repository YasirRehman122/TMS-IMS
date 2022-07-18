const UserService = require("../services/UserService");
const BaseController  = require("./BaseController");
const STATUS_CODES = require('../constants/StatusCodes');
const RESPONSE_MESSAGE = require('../constants/ResponseMessages');

class UserController extends BaseController {
    constructor() {
        
        super();
        
        this.userService = new UserService();
    
    }

    
    async checkEmail(req, res, next){
        try{

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> CHECK EMAIL API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>>> BODY: ", req.body);

            let response = await this.userService.checkEmail(req.body);

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.SUCCESS, {otp: response})
        }
        catch(err){
            console.log(err);
            this.handleExceptions(err, res);
        }

        
    }

    async signUp(req, res, next) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SIGNUP API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>>> BODY: ", req.body);

            let newUser = await this.userService.signUp(req.body);
            
            res.success(STATUS_CODES.CREATED, RESPONSE_MESSAGE.USER_CREATED, newUser);
        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
        
        
    }

}


module.exports =  UserController;