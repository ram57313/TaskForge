const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Task must have a title']
    },
    description:{
        type:String,
        // default:this.title
    },
    status:{
        type:Boolean,
        default:false
    },
    category:{
        type:String,
        enum:{
            values:["personal","work","study","other"],
            message:"Category can only be Personal,Work,Study,Other"
        }
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
})

taskSchema.pre('save',function(){//this runs for only save or create
    if(!this.description){
        this.description=this.title
    }
})

const Task=mongoose.model('Task',taskSchema);

module.exports=Task;