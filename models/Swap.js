import mongoose from "mongoose";
import { ObjectId } from "bson";
const swapSchema=new mongoose.Schema({
      sender:{type:ObjectId,required:true},
      date:{type:Date,required:true},
      status:{type:String,required:true},
      timePeriodfrom:{type:String,required:true},
      timePeriodto:{type:String,required:true},
      receiver:{type:ObjectId,required:true}
},{
    timestamps:true
});
const swap= mongoose.model('Swap',swapSchema);
export default swap;