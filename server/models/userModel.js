const mongoose=require("mongoose");
const brcypt=require("bcrypt");

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
        select:false
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
userSchema.pre('save',async function(){
    if(!this.isGuest)this.password=await brcypt.hash(this.password,12);
})

const User=mongoose.model('User',userSchema);
module.exports=User;