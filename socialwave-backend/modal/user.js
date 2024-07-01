const mongoose=require("mongoose")
const Schema=mongoose.Schema

const user= Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})
module.exports= new mongoose.model('user',user)