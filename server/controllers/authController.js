const User=require("../models/userModel");


exports.signup=async(req,res,next)=>{
    try{
       const user=await User.create({
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
    }catch(err){
        console.log(err.message);
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }
       
}
