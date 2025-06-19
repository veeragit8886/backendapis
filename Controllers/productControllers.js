const Product = require("../Models/productModel")



exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    }
    catch (error) {
        res.status(400).json({ responCode: 500, message: 'Error fetching products' })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product)
    }
    catch (error) {
        res.status(500).json({ responseCode: 500, message: "Error fetching product" })
    }
}

exports.addProduct = async (req, res) => {
    try {
        const { name, price, description, quantity, category, image } = req.body
        if (!name || !price || !description || !quantity || !category || !image) {
            return res.status(400).json({ responseCode: 400, message: 'Fill all the data' })
        }
        const products = await Product.create({ name, price, description, quantity, category, image })
        return res.status(201).json({ responseCode: 201, message: "Product added successfully" })
    }
    catch (error) {
        res.status(500).json({ responseCode: 500, message: "Error product not adding" })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const products = await Product.findByIdAndUpdate(id, req.body)
        if (!products) {
            return res.status(400).json({ responseCode: 400, message: "Product not found" })
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ responseCode: 500, message: "Error not updated" })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const products = await Product.findByIdAndDelete(id)
        if (!products) {
            return res.status(400).json({ responseCode: 404, message: "Product not deleted" })
        }
        return res.status(200).json({ responseCode: 200, message: "Product deleted successfully" })
    }
    catch (error) {
        res.status(500).json({ responseCode: 500, message: "Error product not deleted" })
    }
}