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
            values:["Personal","Work","Study","Other"],
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
    deletedAt:{
        type:Date,
        default:null
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    priority:{
    type:String,
    enum:["Low","Medium","High"],
    default:"Medium" 
    },

    dueDate:{
        type:Date,
        default:null
    },
    isArchived:{
      type:Boolean,
      default:false
    }
})


taskSchema.pre('save',function(){//this runs for only save or create
    if(!this.description){
        this.description=this.title
    }
})

taskSchema.index(
   {deletedAt:1},
   {expireAfterSeconds:7*24*60*60}
)


const Task=mongoose.model('Task',taskSchema);

module.exports=Task;