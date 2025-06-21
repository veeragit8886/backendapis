const Express = require('express');
const Routers = Express.Router();
const CategoryController = require('../Controllers/categoryControllers');



Routers.post('/addcategory',CategoryController.addCategory);
Routers.get('/getcategory',CategoryController.getCategory);
Routers.get('/getcategory/:id',CategoryController.getCategoryById);
Routers.put('/updatecategory/:id',CategoryController.updateCategory);
Routers.delete('/deletecategory/:id',CategoryController.deleteCategory);

module.exports = Routers