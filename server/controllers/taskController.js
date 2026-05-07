const Task=require("../models/taskModel");
const catchAsync=require("../utils/catchAsync");
const AppError=require("../utils/appError");
const Apifeatures=require("../utils/apiFeatures");

exports.createTask=catchAsync(async(req,res,next)=>{
    const task=await Task.create({
        title:req.body.title,
        description:req.body.description,
        status:req.body.status,
        isDeleted:req.body.isDeleted,
        category:req.body.category,
        user:req.user._id
    })

    res.status(200).json({
        status:"success",
        task
    })
})

exports.getAllTasks=catchAsync(async(req,res,next)=>{
    let filter={};
    
        if(req.query.status==='complete'){
            filter.status=true;
        }else if (req.query.status==='incomplete'){
            filter.status=false;
        }
        if(req.query.isDeleted==='true')filter.isDeleted=true;
        else if(req.query.isDeleted==='false')filter.isDeleted=false;

        if(!req.query.isDeleted)filter.isDeleted=false;


      filter.user=req.user._id;
       
    const features=new Apifeatures(Task.find(filter),req.query).sort();

    const tasks=await features.query;
    if(!tasks)return next(new AppError("something went wrong,Please try again",404));

    res.status(200).json({
        status:"success",
        result:tasks.length,
        tasks:tasks.length>0?tasks:"No Tasks"
    })
})

exports.getTask=catchAsync(async(req,res,next)=>{
    const task=await Task.findById(req.params.id);
    if(!task)return next(new AppError("No Task found ,Please try again",404));

    res.status(200).json({
        status:"success",
        task
    })
})

exports.deleteTaskPermanent=catchAsync(async(req,res,next)=>{//only if the task has to deleted completely
 const task=await Task.findByIdAndDelete(req.params.id);

 if(!task)return next(new AppError("No Task with that ID",404));

 res.status(204).json({
    status:"success",
    data:null
 })
})

exports.deleteTaskTemp=catchAsync(async(req,res,next)=>{
    const task=await Task.findByIdAndUpdate(req.params.id,{
        isDeleted:true
    });

    res.status(204).json({
        status:"success",
        message:"deleted temporarily"
    })
})


exports.updateTask=catchAsync(async(req,res,next)=>{
    const task=await Task.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
   
    if(!task)return next(new AppError("No Task found with that ID",404)); 

    if(!req.body.description&&req.body.title){
        req.body.description=req.body.title;
    }

    res.status(200).json({
        status:"success",
        task
    })

})







// exports.toggleStatus=(req,res,next)=>{} this should be operated through frontend



