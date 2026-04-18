const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A user must have a name']
    },
    email:{
        type:String,
        required:[true,'A user must have a valid email id'],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:8,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    isGuest:{
        type:Boolean,
        default:false
    }
})

const User=mongoose.model('User',userSchema);

module.exports=User;