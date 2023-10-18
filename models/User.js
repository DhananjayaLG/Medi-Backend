import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema=new mongoose.Schema({
    Email:{type:String,required:true,unique:true},
    password:{type:String,default:bcrypt.hashSync("12345678")},
    role:{type:String,required:true},
    Name:{type:String,required:true},
    Type:{type:String},
    WardName: {type:String},
    Specialization: {type:String}, 
    Status: {type:String,default:"Available"},
    Address:{type:String,required:true},
    ContactNo: {type:String,required:true},
    ID:{type:Number}
},{
    timestamps:true
});
const user= mongoose.model('User',userSchema);
export default user;