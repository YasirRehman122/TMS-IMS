const UserController = require("./UserController");
const CustomerService = require("../services/CustomerService");
const STATUS_CODES = require("../constants/StatusCodes");
const RESPONSE_MESSAGE = require("../constants/ResponseMessages");

class CustomerController extends UserController{

    constructor() {
        super();

        this.customerService = new CustomerService();
    }


    async getUsersList(req, res) {
        try{
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>> GET USERS LIST API <<<<<<<<<<<<<<<<<<<<<<<<<");

            console.log(">>>>>> BODY: ", JSON.stringify(req.body));

            // Calling customer service to get list of users
            let usersList = await this.customerService.getUsersList(req.body);
            
            // returning response
            res.success(STATUS_CODES.SUCCESS, RESPONSE_MESSAGE.SUCCESS, usersList);

        }
        catch(err){
            console.log(err);
            this.handleExceptions(err, res);
        }

    }
    
}

module.exports =  CustomerController;