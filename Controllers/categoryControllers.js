const Category = require('../Models/categoryModel')

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.find()
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({responseCode:500, message: 'Error fetching data' })
    }
}

exports.getCategoryById = async(req,res)=>{
    try {
        const {id}= req.params;
        const category = await Category.findById(id)
         if (!category) {
            return res.status(404).json({responseCode:404, message: "Category not found" });
        }
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({responseCode:500,message:'Error fetching data',error: error.message})
    }
}

exports.addCategory = async(req,res)=>{
    try {
        const {name,description,price,categories,image}=req.body;
        if(!name || !description || !price || !categories || !image){
            return res.status(400).json({
                message:"All fields are required"
            });
        }
        const category = new Category({image,name,categories,description,price});
        await category.save();
        res.status(201).json({responseCode: 201, message: "Product added successfully"})
    } catch (error) {
        res.status(500).json({responseCode:500, message: 'Error adding data',error:error.message })
    }
}
   
exports.updateCategory = async(req,res)=>{
    try {
        const {id} = req.params;
          const updateData = req.body;
        if(!id){
            return res.status(400).json({responseCode:400, message: 'Error updating data, id not found' })
        }
        const category = await Category.findByIdAndUpdate(id,updateData, { new: true })
        res.status(200).json({
            responseCode:200, 
            message: "Category updated successfully",
            data:category
        })
    } catch (error) {
        res.status(400).json({responseCode:400, message: 'Error updating data' })
    }
}

exports.deleteCategory= async(req,res)=>{
    try {
        const {id} = req.params
        const category = await Category.findByIdAndDelete(id)
        if (!category) return res.status(404).json({responseCode:404, message: "Category not found" });
        res.status(200).json({responseCode:200, message: "Category deleted successfully"})
    } catch (error) {
        res.status(500).json({responseCode:500,message:'Error deleting data'})
    }
}











