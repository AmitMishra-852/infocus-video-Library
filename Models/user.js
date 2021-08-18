const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, "Please Provide a userName"],
        min:8,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:[true , "Please Provide a Email"],
        min:10,
        max:20,
        unique:true
    },
    password:{
        type:String,
        required:[true , "Please add a Passwords"],
        min:8,
        max:16,
        unique:true
    },
    profilePicture:{
        type:String,
        default:""
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)

module.exports = User;