const UserService = require("./UserService");
const userModel = require("../models/user");

class CustomerService extends UserService{
    constructor() {
        super()
        
    }


    async getUsersList(data){
        try{

            let userIds = data.ids;
            let usersList = await userModel.getUsersList(userIds);
            
            console.log("Users list", usersList);

            return usersList;

        }
        catch(err){
            throw err;
        }
    }


}


module.exports =  CustomerService;