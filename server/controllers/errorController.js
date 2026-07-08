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
    console.log("development");
  if(req.originalUrl.startsWith('/api')){
      return res.status(err.statusCode).json({
          status:err.status,
          message:err.message,
          stack:err.stack,
          error:err
      });
  }
  console.error("ERROR 🔴",err);
  return res.status(res.statusCode).json('error',{
   title:'Something went wrong',
   msg:err.message
  })
}

const sendErrorProd=(err,req,res)=>{
    if(req.originalUrl.startsWith('/api')){

        if(err.isOperational){
            console.log("production operational");
            res.status(err.statusCode).json({
                title:"something went wrong",
                message:err.message
            })
        }
        else{
            console.log("non operational");
            res.status(500).json({
                status:"error",
                message:"something went wrong"
            })
        }
    }

    if (err.isOperational) {//if it is a trusted error 
      console.log('operational production');
      return res.status(err.statusCode).json('error',{
        title:'Something Went Wrong',
        msg: err.message,
      });
    } 
      console.error('Error 🔴', err); //=>for developer
      console.log('non operational');
      return res.status(500).json('error',{
        //=>for client
        title: 'Something Went Wrong',
        msg: 'Please Try Again Later',
      });
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