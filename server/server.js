const app=require('./app');
const mongoose=require("mongoose")
const dotenv=require("dotenv");
dotenv.config({path:'./configS.env'})

const port=process.env.PORT||7000;
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD,);
mongoose.connect(DB).then(connection=>{
    // console.log(connection.connections);
    console.log('DB Connection successfull'); 
})
const server=app.listen(port,()=>{
    console.log("app is on live");
})

