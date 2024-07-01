const mongoose=require("mongoose")
const Schema=mongoose.Schema

const practice= Schema({
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    }
})
module.exports= new mongoose.model('practice',practice)