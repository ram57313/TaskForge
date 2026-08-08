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
    
    console.log("Type:", typeof req.body.dueDate);
console.log("Value:", req.body.dueDate);

    const task=await Task.create({
        title:req.body.title,
        description:req.body.description,
        status:req.body.status,
        isDeleted:req.body.isDeleted,
        category:req.body.category,
        priority:req.body.priority,
        dueDate:req.body.dueDate,
        user:req.user._id
    })

    console.log("Saved:", task.dueDate);
 
    res.status(200).json({
        status:"success",
        task
    })
})

exports.getAllTasks=catchAsync(async(req,res,next)=>{
    let filter={};
    
       filter.user = req.user._id;

// Default: don't show deleted tasks
filter.isDeleted = false;

// Show deleted tasks only if requested
if (req.query.isDeleted === "true") {
    filter.isDeleted = true;
}

// Apply status filter only if requested
if (req.query.status === "completed") {

    filter.status = true;

}

else if (req.query.status === "pending") {

    filter.status = false;

}
       
    const features=new Apifeatures(Task.find(filter),req.query).sort();

    const tasks=await features.query;

    if(!tasks)return next(new AppError("something went wrong,Please try again",404));

    res.status(200).json({

    status:"success",

    result:tasks.length,

    tasks

});
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


exports.updateTask = catchAsync(async (req, res, next) => {

    if (req.body.deletedAt || req.body.isDeleted)
        return next(
            new AppError(
                "You cant update the restricted fields",
                400
            )
        );

    // If description is empty, use the title
    if (!req.body.description?.trim() && req.body.title) {

        req.body.description = req.body.title;

    }

    const filteredBody = filteredObj(
        req.body,
        "title",
        "description",
        "category",
        "priority",
        "dueDate"
    );

    const task = await Task.findByIdAndUpdate(
        req.params.id,
        filteredBody,
        {
            new: true,
            runValidators: true
        }
    );

    if (!task)
        return next(
            new AppError(
                "No Task found with that ID",
                404
            )
        );

    res.status(200).json({
        status: "success",
        task
    });

});


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





exports.toggleStatusOfTask = catchAsync(async (req, res, next) => {

    const task = await Task.findById(req.params.id);

    if (!task) {

        return next(
            new AppError("No Task found with that ID", 404)
        );

    }

    task.status = !task.status;

    await task.save();

    res.status(200).json({

        status: "success",

        message: "Status toggled successfully",

        task

    });

});


