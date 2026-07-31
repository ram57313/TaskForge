const User=require("../models/userModel");
const AppError=require("../utils/appError");
const catchAsync=require("../utils/catchAsync");
const cookie=require("cookie-parser");


const filterObj=(obj,...allowedFields)=>{
    const newobj={};
    Object.keys(obj).forEach(el=>{
        if(allowedFields.includes(el))newobj[el]=obj[el];
    })

    return newobj;
}


exports.getAllUsers=catchAsync(async (req,res,next)=>{
    const users=await User.find().select('-__v');
    if(!users)return next(new AppError("something went wrong.Please try again",404));//most rare cases
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
        user
    });

})

exports.getMe=(req,res,next)=>{
    req.params.id=req.user.id;
    next();
}

exports.updateMe=catchAsync(async(req,res,next)=>{
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
})

exports.deleteMe=catchAsync(async(req,res,next)=>{//this should be there as there is  difference between logout and deleting account
    const user=await User.findByIdAndUpdate(req.user.id,{
        active:false,
        deletedAt:new Date()
    })

    res.clearCookie('jwt');

    res.status(204).json({
        status:"success",
        message:"deleted Temporarily",
        data:{
            user:null
        }
    })
})

// exports.deleteMe=catchAsync(async(req,res,next)=>{
//     const user=await User.findByIdAndDelete(req.user.id);

//     res.status(204).json({
//         status:"success", 
//         data:null
//     })
// })

exports.restoreUser=catchAsync(async(req,res,next)=>{//this is not required actually bcoz this is looked after by login
    const {email,password}=req.body;
    const user=await User.findOne({email:req.body.email}).select('+password');
    user.active=true;
    user.deletedAt=null;
     if(!await user.correctPassword(password, user.password))
        {
            return next(new AppError("Incorrect Email or Password",401));
        }
    await user.save({validateBeforeSave:false});
    console.log(user);
    if(!user)return next(new AppError("no user with that Id",404));
    user.password=undefined;//not letting it to come in response

    res.status(200).json({
        status:"sucess",
        message:"welcome back",
        user
    })

})