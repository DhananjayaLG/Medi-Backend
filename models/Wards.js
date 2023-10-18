import mongoose from "mongoose";
const wardsSchema=new mongoose.Schema({
   
      WardID:{type:Number,required:true,unique:true},
      ConsultantID:{type:Number,required:true},
      WardName:{type:String,required:true},
      NumberOfShitfs:{type:Number,required:true},
      NumberOfBeds:{type:Number,required:true}
},{
    timestamps:true
});
const ward= mongoose.model('Ward',wardsSchema);
export default ward;