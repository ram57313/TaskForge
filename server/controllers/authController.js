const User=require("../models/userModel");
const catchAsync = require("../utils/catchAsync");


exports.signup=catchAsync(async(req,res,next)=>{
       const user=await User.create({//need to make lot of changes
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
       });
       res.status(201).json({
        status:"success",
        data:{
            user
        }
       });
    
});

exports.guestSignup=catchAsync(async(req,res,next)=>{
    const guestUser=await User.create({
        name:`guest${Date.now()}`,
        email:`guest${Date.now()}@demo.com`,
        password:"guest1234",
        isGuest:true
    });
    
    res.status(200).json({
        status:"success",
        guestUser
    })
})
