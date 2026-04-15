const app=require('./app');

const port=process.env.PORT||7000
const server=app.listen(port,()=>{
    console.log("app is on live");
})

