const {promisify}=require('util');
const User=require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError=require("../utils/appError");
const jwt=require("jsonwebtoken");
const cookie=require("cookie-parser");
const cookieParser = require("cookie-parser");
const Email = require('../utils/Email');
const crypto=require("crypto");

const signToken=(id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN} );
}

const createSendToken=(user,statusCode,res)=>{
    const token=signToken(user._id);

    const cookieOptions={
        expires:new Date(Date.now()+(process.env.JWT_COOKIE_EXPIRES_IN)*24*60*60*1000),
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",//sent only when we use https
        sameSite:process.env.NODE_ENV==="production"?"none":"lax"
    }
    
    // if(process.env.NODE_ENV==='production')cookieOptions.secure=true;

    // console.log("COOKIE SET");

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
       const newuser=await User.create({//need to make lot of changes?????
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
       });
    //    const user=await User.findById(newuser._id).select('-password')

    try{
       new Email(newuser).sendWelcome();
   }catch(err){
       console.error("something went wrong in sending the email");
   }
     createSendToken(newuser,200,res);

    
});

exports.login=catchAsync(async(req,res,next)=>{
    const {email,password}=req.body;
    
    if(!email||!password)return next(new AppError("Please provide email and password",400));

    const user=await User.findOne({email:email}).select('+password');
    
    if(!user){
        return next(new AppError("The user no longer exists",401));
    }
    if(!user.active){
        return next(new AppError("Account deletd.Restore your account to continue"));
    }
    if(!await user.correctPassword(password, user.password))
        {
            // console.log(user);

            return next(new AppError("Incorrect Email or Password",401));
        }

    //  console.log(user);
    //  console.log(res);


     createSendToken(user,200,res);
})
exports.logout=catchAsync(async(req,res,next)=>{
    
        res.clearCookie('jwt',{
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        });
     
        res.status(200).json({
            status:"success",
            message:"Logged out successfully",
            data:{
                user:null
            }
        })
})

exports.guestSignup=catchAsync(async(req,res,next)=>{
    const user=await User.create({
        name:`guest${Date.now()}`,
        email:`guest${Date.now()}@demo.com`,
        password:"guest1234",
        confirmPassword:"guest1234",
        isGuest:true,

    });
    
    createSendToken(user,200,res);
    // res.status(200).json({
    //     status:"success",
    //     message:"guest users only has access for 24 hours,signup for permanent access",
    //     user
    // })
})

exports.protect=catchAsync(async(req,res,next)=>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }else if(req.cookies.jwt){
        token=req.cookies.jwt;
    }

    if(!token)return next(new AppError('you are not logged in ,Please login',401));
    // console.log(token);

     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentuser=await User.findById(decoded.id);
    if(!currentuser)return next(new AppError("The user of this Id is no longer exist,Please login again",401));

    req.user=currentuser;
    res.locals.user=currentuser;

    next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {

        return next(
            new AppError(
                "No user with this email",
                404
            )
        );

    }


    const resetToken = user.createResetToken();

    await user.save({
        validateBeforeSave: false
    });


    // React frontend reset page
    const resetUrl =
        `http://localhost:5173/reset-password/${resetToken}`;


    try {

        await new Email(
            user,
            resetUrl
        ).sendPasswordReset();


        res.status(200).json({

            status: "success",

            message:
                "Password reset link sent to your email"

        });

    }

    catch (err) {

        // console.log("Password reset email error:", err);


        user.passwordResetToken = undefined;

        user.passwordResetExpires = undefined;


        await user.save({
            validateBeforeSave: false
        });


        return next(
            new AppError(
                "There was an error sending the email. Please try again.",
                500
            )
        );

    }

});

exports.resetPassword = catchAsync(async (req, res, next) => {

    const hashedToken =
        crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");


    const user = await User.findOne({

        passwordResetToken: hashedToken,

        passwordResetExpires: {
            $gt: Date.now()
        }

    });


    if (!user) {

        return next(
            new AppError(
                "Invalid or expired reset token",
                400
            )
        );

    }


    user.password = req.body.password;

    user.confirmPassword =
        req.body.confirmPassword;

    user.passwordResetToken = undefined;

    user.passwordResetExpires = undefined;


    await user.save();


    createSendToken(
        user,
        200,
        res
    );

});

exports.updatePassword=catchAsync(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select('+password');

    if(!user)return next(new AppError("There is no user with this Id",404));

    if(!await user.correctPassword(req.body.passwordCurrent,user.password))return next(new AppError("Entered Password is Invalid",401));

    user.password=req.body.password;
    user.confirmPassword=req.body.confirmPassword;

    await user.save();

    createSendToken(user,200,res);
})