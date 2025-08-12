const { log } = require("console");

class UserService{

     createUser(data){
        console.log("Creating user",data);
    }

}

module.exports = new UserService();