const mongoose=require("mongoose");
const brcypt=require("bcrypt");
const crypto=require("crypto");
const catchAsync = require("../utils/catchAsync");

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
    confirmPassword:{
        type:String,
        required:[true,'Confirm the entered Password please'],
        validate:{
            validator:function (el){
            return el===this.password
            },
            message:"passwords are not same"
        }
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    passwordResetToken:String,
    passwordResetExpires:Date,
    passwordChangedAt:Date,
    isGuest:{
        type:Boolean,
        default:false
    }
})
userSchema.pre('save',async function(){
    if(!this.isModified('password')) return ; 

    if(!this.isGuest){
        this.password=await brcypt.hash(this.password,12);
        this.confirmPassword = undefined;
    }
})

userSchema.pre('save',function(next){
    if(!this.isModified('password')||this.isNew)return next();

    this.passwordChangedAt=Date.now();
   next();
})

userSchema.methods.createResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log({ resetToken },this.passwordResetToken);
    this.passwordResetExpires=Date.now()+10*60*1000;
    return resetToken;
}

userSchema.methods.correctPassword=async function(candidatePassowrd,userPassword){
    return await brcypt.compare(candidatePassowrd,userPassword);
}

const User=mongoose.model('User',userSchema);
module.exports=User;