import mongoose from "mongoose";
import { ObjectId } from "bson";
const leaveSchema=new mongoose.Schema({
   
      date:{type:Date,required:true},
      status:{type:String,required:true},
      reason:{type:String,required:true},
      userId:{type:ObjectId,required:true}
},{
    timestamps:true
});
const leave= mongoose.model('Leave',leaveSchema);
export default leave;