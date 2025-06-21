const Mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')

const userSchema = new Mongoose.Schema({
    email: { type: String, required: true  },
    password: { type: String, required: true },
    username: { type: String , required: true },
    mobile: { type: String, required: true },

},{ timestamps: true })


module.exports = Mongoose.model("user", userSchema)