const Express = require("express")
const Routers = Express.Router()
const productController = require("../Controllers/productControllers")


Routers.get("/products", productController.getProducts)
Routers.get("/product/:id", productController.getProductById)
Routers.post("/addProduct", productController.addProduct)
Routers.put("/product/:id", productController.updateProduct)
Routers.delete("/product/:id", productController.deleteProduct)


module.exports = Routers