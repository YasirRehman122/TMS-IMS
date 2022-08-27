const UserService = require("../services/UserService");
const BaseController  = require("./BaseController");
const STATUS_CODES = require('../constants/StatusCodes');
const RESPONSE_MESSAGE = require('../constants/ResponseMessages');

class UserController extends BaseController {
    constructor() {
        
        super();
        
        // creating isntance of user service
        this.userService = new UserService();
    
    }

    
    /**
     * This function is responsible to if the provided email and cell nu,ber already exists in database or not
     * @param {*} req request object
     * @param {*} res response object
     */
    async checkEmailAndCell(req, res){
        try{

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> CHECK EMAIL API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>>> BODY: ", JSON.stringify(req.body));

            // calling checkEmailAndCell function inside user service
            let response = await this.userService.checkEmailAndCell(req.body);

            // returning response to the user
            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.SUCCESS, {otp: response})
        }
        catch(err){
            // consoling the err
            console.log(err);
            //handling the error
            this.handleExceptions(err, res);
        }

        
    }

    async signUp(req, res) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SIGNUP API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>>> BODY: ", JSON.stringify(req.body));

            // calling signup fucntion from user service
            let newUser = await this.userService.signUp(req.body);
            
            // returning response
            res.success(STATUS_CODES.CREATED, RESPONSE_MESSAGE.USER_CREATED, newUser);
        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async login(req, res) {
       
        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> LOGIN API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            // Calling login function inside user service 
            let loginToken = await this.userService.login(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> LOGIN SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<");

            // returning response
            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.LOGIN_SUCCESS, {token: loginToken});

        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }


    async changePassword(req, res) {

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> CHANGE PASSWORD API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            await this.userService.changePassword(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> CHANGE PASSWORD SUCCESSFUl <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.PASSWORD_UPDATED, null);

        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }


    async sendCode(req, res){
        
        try{
           
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> SEND CODE API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            let code = await this.userService.sendCode(req.body);
            console.log(">>>>>>>", code)

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> CODE SENT SUCCESSFULLY <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.CODE_SENT, {code: code});


        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

    async forgetPassword(req, res){

        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> FORGET PASSWORD API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>> BODY: ", JSON.stringify(req.body));

            await this.userService.forgetPassword(req.body);

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> CHANGE PASSWORD SUCCESSFUL <<<<<<<<<<<<<<<<<<<<<<<<<");

            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.PASSWORD_UPDATED, null);

        }
        catch (err){
            console.log(err);
            this.handleExceptions(err, res);
        }
    }

}


module.exports =  UserController;