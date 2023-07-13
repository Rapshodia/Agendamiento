const UserController = require("../controllers/user.controllers");

module.exports = app => { 
   
    app.post('/api/users', UserController.register);
    app.post('/api/login', UserController.login)
 
}