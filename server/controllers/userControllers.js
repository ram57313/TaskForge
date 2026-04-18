const User=require("../models/userModel");
const AppError=require("../utils/appError");
const catchAsync=require("../utils/catchAsync");

exports.getAllUsers=catchAsync(async (req,res,next)=>{
    const users=await User.find();
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

