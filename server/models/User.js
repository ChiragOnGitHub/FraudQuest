const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        trim:true,
    },
    lastName :{
        type:String,
        required:true,
        trim:true,
    },
    email: {
        type:String,
        required:true,
        trim:true,
        unique: true,
    },
    password: {
        type:String,
        required: function () {
            // Required only if Google ID is not provided
            return !this.googleId;
          },
    },
    accountType: {
        type:String,
        enum:["Admin", "Student"],
        required:true    
    },
    googleId : {
        type:String,
        default:"",
    }
    ,
    token :{
        type:String,
    },
    resetPasswordExpires: {
        type:Date,
    },
    additionalDetails: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    image:{
        type:String,
        required:true,
    },

},{timestamps:true});

module.exports = mongoose.model("User", userSchema);