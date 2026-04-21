const AppError=require("../utils/appError");

const handleCastErrorDB=(err)=>{
    const message=`invalid ${err.path}:${err.value}`;
    return new AppError(message,400);
}
const handleDuplicateFieldErrorDB=(err)=>{
  const value=err.message.match(/(["'])(?:\\.|[^\\])*?\1/)[0];
  console.log(value);
  const message=`duplicate field value ${value}.please select another value`;
  return new AppError(message,400);
}
const handleTokenExpiredError=()=>{
    return new AppError("Token has expired,please login again",401);
}

const HandleJwtError=()=>{
    return new AppError("invalid token,Please login again",401);
}

const handleValidationErrorDB=(err)=>{
    const errors=Object.values(err.errors).map(err=>err.message);
    console.log(errors);
    const message=`invalid input data ${errors.join('. ')}`;
    return new AppError(message,400);
}

const sendErrorDev=(err,req,res)=>{

    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        stack:err.stack,
        error:err
    });
}

const sendErrorProd=(err,req,res)=>{
    if(err.isOperational){
        console.log("production operational");
        res.status(err.statusCode).json({
            title:"something went wrong",
            message:err.message
        })
    }else{
    console.log("non operational");
    res.status(500).json({
        status:"error",
        message:"something went wrong"
    })
}
}

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500;
    err.status=err.status||'error';

    console.log(err);
    if(process.env.NODE_ENV==='development'){
        console.log("development");
        sendErrorDev(err,req,res);
    }else if(process.env.NODE_ENV==='production'){
       let error=err
       error.name=err.name;
       error.message=err.message;
       if(error.name==="CastError")error=handleCastErrorDB(error);
       if(error.code===11000)error=handleDuplicateFieldErrorDB(error);
       if(error.name==="TokenExpiredError")error=handleTokenExpiredError();
       if(error.name==="ValidationError")error=handleValidationErrorDB(error);
        sendErrorProd(error,req,res);
    }
}