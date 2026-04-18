const express=require("express");
const app=express();
const morgan=require("morgan");
const userRouter=require("./routes/userRoutes");
const globalErrorHandler=require("./controllers/errorController");

const router=express.Router();
app.use(express.json());
if(process.env.NODE_ENV=='development'){
    app.use(morgan('dev'))
}

app.use('/api/v1/users',userRouter);





app.use(globalErrorHandler);
module.exports=app;