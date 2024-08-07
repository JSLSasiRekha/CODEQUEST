const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const Joi=require('joi');
const passwordComplexity=require("joi-password-complexity");

const userSchema=new mongoose.Schema({
    userName:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    role:{type:String,required:true,default:'user'},
   email:{type:String,required:true},
    password:{type:String,required:true},
    token:{type:String},
    points:{type:Number,default:0},
    streak:{type:Number,default:0},
    easySolved:{type:Number,default:0},
    mediumSolved:{type:Number,default:0},
    hardSolved:{type:Number,default:0}
})

userSchema.methods.generateAuthToken= function(){
    const token=jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token
}

const User=mongoose.model("user",userSchema);

const validate=(data)=>{
    const schema=Joi.object({
        userName:Joi.string().required().label("UserName"),
        firstName:Joi.string().required().label("FirstName"),
        lastName:Joi.string().required().label("LastName"),
        email:Joi.string().email().required().label("Email"),
        password:passwordComplexity().required().label("Password")

    });
    return schema.validate(data);
};

module.exports={User,validate}