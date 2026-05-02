const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const crypto=require("crypto");
const catchAsync = require("../utils/catchAsync");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A user must have a name']
    },
    email:{
        type:String,
        required:[true,'A user must have a valid email id'],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:8,
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,'Confirm the entered Password please'],
        validate:{
            validator:function (el){
            return el===this.password
            },
            message:"passwords are not same"
        }
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    passwordResetToken:String,
    passwordResetExpires:Date,
    passwordChangedAt:Date,
    isGuest:{
        type:Boolean,
        default:false
    },
    active:{
        type:Boolean,
        default:true,
        // select:false
    }
})

// userSchema.pre('save', async function() {
//     // hash password
//     if (!this.isModified('password')) return;

//     if (!this.isGuest) {
//         this.password = await bcrypt.hash(this.password, 12);
//         this.confirmPassword = undefined;
//     }

//     // set passwordChangedAt
//     if (!this.isNew) {
//         this.passwordChangedAt = Date.now() - 1000;
//     }
// });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return ; 

  
  this.password = await bcrypt.hash(this.password, 12); 
  this.confirmPassword = undefined; 

//   next();
});

userSchema.pre('save', async function () {
  if (!this.isModified('password') || this.isNew) return ;

  this.passwordChangedAt = Date.now() - 1000; 
//   next();
}
)
userSchema.pre(/^find/, async function () {
   this.find({ active: { $ne: false } });
});


userSchema.methods.createResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log({ resetToken },this.passwordResetToken);
    this.passwordResetExpires=Date.now()+10*60*1000;
    return resetToken;
}

userSchema.methods.correctPassword=async function(candidatePassowrd,userPassword){
    return await bcrypt.compare(candidatePassowrd,userPassword);
}

const User=mongoose.model('User',userSchema);
module.exports=User;