const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    image:{
     type: String,
      required: true
    },
  name: {
    type: String,
    required: true
  },
  categories:{
    type:String,
    required:true
  },
  description: {
    type: String,
    default: ""
  },
  price:{
    type:String,
    required:true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports=mongoose.model('Category', categorySchema)