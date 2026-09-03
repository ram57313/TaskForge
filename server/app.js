const express=require("express");
const app=express();
const morgan=require("morgan");
const userRouter=require("./routes/userRoutes");
const taskRouter=require("./routes/taskRoutes");
const globalErrorHandler=require("./controllers/errorController");
const cookieParser = require("cookie-parser");
// const ratelimit=require('express-rate-limit')
const helmet=require('helmet');
const cors=require("cors");
const {generalLimiter}=require("./ratelimiters/ratelimiter");
// const mongoSanitize=require("express-mongo-sanitize");
// const xss=require("xss-clean")
const hpp=require("hpp");


app.use(helmet({
    contentSecurityPolicy:'false'
}))

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());

if(process.env.NODE_ENV=='development'){
    app.use(morgan('dev'))
}



app.use('/api',generalLimiter);

//reads data from body to req.body
app.use(express.json({limit:'10kb'}));//body greater than 10kb is not accepted

//Data sanitization against NOSQL injection
// const sanitize = (obj) => {// it looks at req.body and req.params and req query string and remove the dollar signs or harmful ones
//   if (!obj || typeof obj !== 'object') return obj;

//   for (const key of Object.keys(obj)) {
//     if (key.startsWith('$') || key.includes('.')) {
//       delete obj[key];
//     } else {
//       sanitize(obj[key]);
//     }
//   }

//   return obj;
// };

// app.use((req, res, next) => {
//   sanitize(req.body);
//   sanitize(req.params);
//   sanitize(req.query);
//   next();
// });

//Data sanitization against XSS
// app.use(xss()); //eliminate malicious html code 

// app.use(hpp())//parameter pollution is prevented


app.use('/api/v1/users',userRouter);
app.use('/api/v1/tasks',taskRouter);




app.use(globalErrorHandler);
module.exports=app;