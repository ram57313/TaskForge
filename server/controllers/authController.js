const {promisify}=require('util');
const User=require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError=require("../utils/appError");
const jwt=require("jsonwebtoken");
const cookie=require("cookie-parser");
const cookieParser = require("cookie-parser");
const Email = require('../utils/Email');

const signToken=(id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN} );
}

const createSendToken=(user,statusCode,res)=>{
    const token=signToken(user._id);

    const cookieOptions={
        expires:new Date(Date.now()+(process.env.JWT_COOKIE_EXPIRES_IN)*24*60*60*1000),
        httpOnly:true,
        // secure:true  //sent only when we use https
    }
    if(process.env.NODE_ENV==='production')cookieOptions.secure=true;
    res.cookie('jwt',token,cookieOptions);

    user.password=undefined;
    res.status(statusCode).json({
        status:"success",
        token,
        data:{
            user
        }
    })
}
exports.signup=catchAsync(async(req,res,next)=>{
       const newuser=await User.create({//need to make lot of changes
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
       });
    //    const user=await User.findById(newuser._id).select('-password')

     createSendToken(newuser,200,res);
    
});

exports.login=catchAsync(async(req,res,next)=>{
    const {email,password}=req.body;
    
    if(!email||!password)return next(new AppError("Please provide email and password",400));

    const user=await User.findOne({email:email}).select('+password');
    
    if(!user)return next(new AppError("Incorrect Email or Password",401));

    //  console.log(user);
    //  console.log(res);

     createSendToken(user,200,res);
})
exports.logout=(req,res,next)=>{
    res.clearCookie('jwt');
    // console.log(res.cookie());
    res.status(200).json({
        status:"success",
        "message":"logged out succesfully"
    })
}
exports.guestSignup=catchAsync(async(req,res,next)=>{
    const guestUser=await User.create({
        name:`guest${Date.now()}`,
        email:`guest${Date.now()}@demo.com`,
        password:"guest1234",
        confirmPassword:"guest1234",
        isGuest:true
    });
    
    res.status(200).json({
        status:"success",
        guestUser
    })
})

exports.protect=catchAsync(async(req,res,next)=>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }else if(req.cookies.jwt){
        token=req.cookies.jwt;
    }

    if(!token)return next(new AppError('you are not logged in ,Please login',401));
    console.log(token);

     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentuser=await User.findById(decoded.id);
    if(!currentuser)return next(new AppError("The user of this Id is no longer exist,Please login again",401));

    req.user=currentuser;
    res.locals.user=currentuser;

    next();
});

exports.forgotPassword=catchAsync(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    console.log(user);

    if(!user)return new AppError('No user with this email',404);
    
    const resetToken=user.createResetToken();
    await user.save({validateBeforeSave:false});

    const resetUrl=`${req.protocol}//${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message=`Forgot your password? send a patch request to this url to reset your password-${resetUrl}.If you didnt forget ,please ignore this`;

    try{
       await new Email(user,resetUrl).sendPasswordReset();

       res.status(200).json({
        status:"success",
        message:"token sent to email"//need to do change as there is no html for this
       })
    }catch(err){
        console.log(`error ${err}`);
      user.passwordResetToken=undefined
      user.passwordResetExpires=undefined

      return next(new AppError('There is an error in sending email,Please try again',500));
    }

})


