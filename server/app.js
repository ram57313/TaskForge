const express=require("express");
const app=express();
const morgan=require("morgan");
const userRouter=require("./routes/userRoutes");
const globalErrorHandler=require("./controllers/errorController");
const cookieParser = require("cookie-parser");

const router=express.Router();
app.use(cookieParser());
app.use(express.json());
if(process.env.NODE_ENV=='development'){
    app.use(morgan('dev'))
}

app.use('/api/v1/users',userRouter);





app.use(globalErrorHandler);
module.exports=app;