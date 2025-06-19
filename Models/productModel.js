const Mongoose = require("mongoose")


const productSchema = new Mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true,
        default:0
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

},{timestamps:true})


module.exports = Mongoose.model("product",productSchema)









