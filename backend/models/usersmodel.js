const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:mongoose.Schema.Types.Mixed,
        required:true

    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    }
},{timestamps:true}) 

let userModel = mongoose.model("users",userSchema);

module.exports = userModel;
