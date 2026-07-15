const Task=require("../models/taskModel");
const catchAsync=require("../utils/catchAsync");
const AppError=require("../utils/appError");
const Apifeatures=require("../utils/apiFeatures");



const filteredObj=(obj,...allowedFields)=>{
        const newObj={};
        Object.keys(obj).forEach(el=>{
            if(allowedFields.includes(el))newObj[el]=obj[el];
        })
        return newObj;
    }


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
         
        if(req.query.status)filter.status=true;
        else {
            filter.status=false;//only those tasks which are not finished
        }

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
        isDeleted:true,
        deletedAt:new Date()
    });
    console.log(task);
  if(!task)return next(new AppError("no Task is Found",404));//this is not needed actually

    res.status(204).json({
        status:"success",
        message:"deleted temporarily"
    })
})


exports.updateTask=catchAsync(async(req,res,next)=>{
    if(req.body.deletedAt||req.body.isDeleted)return next(new AppError("You cant update the restricted fields",400))//also think of about access to changing of status
    
    const filteredBody=filteredObj(req.body,"title","category","description")
    
    const task=await Task.findByIdAndUpdate(req.params.id,filteredBody,{
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


//has to implement a feature which will reset the attribute of deletedAt and isDeleted ,so that the userr can restore the task or his own account
exports.restoreTask=catchAsync(async(req,res,next)=>{
    const task=await Task.findByIdAndUpdate(req.params.id,{
        isDeleted:false,
        deletedAt:null
    },{new:true})

    if(!task)return next(new AppError("no Task with that Id",404));

    res.status(200).json({
        status:"sucess",
        message:"Task restored succesfully",
        task
    })

})





exports.toggleStatusOfTask=catchAsync(async(req,res,next)=> {//if finished,u can click it to mark it as finished,if u want to undo it ,u can toggle

    const task=await Task.findById(req.params.id);
    task.status=!task.status;
    task.save();

    res.status(200).json({
        status:"success",
        message:"status toggled successfully",
        task
    })
});



