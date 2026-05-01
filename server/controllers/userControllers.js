const { timingSafeEqual } = require("crypto");
const { findByIdAndUpdate } = require("../models/taskModel");
const User=require("../models/userModel");
const AppError=require("../utils/appError");
const catchAsync=require("../utils/catchAsync");


const filterObj=(obj,...allowedFields)=>{
    const newobj={};
    Object.keys(obj).forEach(el=>{
        if(allowedFields.includes(el))newobj[el]=obj[el];
    })

    return newobj;
}


exports.getAllUsers=catchAsync(async (req,res,next)=>{
    const users=await User.find().select('-__v');
    if(!users)return new AppError("something went wrong.Please try again",404);//most rare cases
    res.status(200).json({
        status:"success",
        data:{
            users
        }
    })

}
)

exports.getUser=catchAsync(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user)return next(new AppError('No user Found .Please try again',404));
    res.status(200).json({
        status:"success",
        data:{
            user
        }
    });

})

exports.getMe=(req,res,next)=>{
    req.params.id=req.user.id;
    next();
}

exports.updateMe=async(req,res,next)=>{
    if(req.body.password||req.body.passwordConfirm){
        return next(new AppError("Use UpdatePassword Route for updating your password",400));
    }

    const filteredBody=filterObj(req.body,'name','email');

    const updatedUser=await User.findByIdAndUpdate(req.user._id,filteredBody,{
        new:true,
        runValidators:true
    })
    
    res.status(200).json({
        status:"success",
        user:updatedUser
    })
}