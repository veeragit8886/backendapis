const Express = require ("express")
const Routers = Express.Router()
const userControllers = require('../Controllers/userControllers');

// const authenticate = require("../middleware/authenticate");

Routers.post("/register",userControllers.userRegister);
Routers.post("/login", userControllers.userLogin);
Routers.post("/logout", userControllers.userLogout);


Routers.get('/users', userControllers.getAllUsers);


Routers.get('/users/:id', userControllers.getUsers);
Routers.post("/addUsers",userControllers.addUser)
Routers.put("/users/:id",userControllers.updateUser)    
Routers.delete("/users/:id",userControllers.deleteUser)

// Routers.put("/users/:id", authenticate, updateUser);


module.exports = Routers



