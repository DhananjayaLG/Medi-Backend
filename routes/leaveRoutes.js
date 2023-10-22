import express from 'express';
import mongoose from 'mongoose';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';
import leave from '../models/Leave.js';
import user from '../models/User.js';

const ObjectId = mongoose.Types.ObjectId;
const leaveRouter=express.Router();
leaveRouter.get('/getLeave',isAuth,expressAsyncHandler(async(req,res)=>{
    const user_Id= req.user._id;
    try{
        const leaves= await leave.find({userId:new ObjectId(user_Id)})
    res.send(leaves);
    }
    catch(err){
        res.send(err)
    }
    
}));
leaveRouter.get('/getLeaveAdmin',isAuth,expressAsyncHandler(async(req,res)=>{
    const requests= await leave.find({});
    const leaveSet=[]
    for(const le of requests){
        const User= await user.findById(le.userId)
        const processed={
            _id:le._id,
           name:User.Name,
           role:User.role,
           date:le.date,
           status:le.status,
           reason:le.reason
        }
        leaveSet.push(processed);
    }
    res.send(leaveSet)
}))
leaveRouter.post('/addLeave',isAuth,expressAsyncHandler(async(req,res)=>{
    const user_Id= req.user._id;
    const newLeave= new leave({
        date:req.body.leaveRequestData.date,
        status:"Pending",
        reason:req.body.leaveRequestData.reason,
        userId:user_Id
    });
    await newLeave.save();
    res.send(newLeave);
}));
leaveRouter.put('/editLeave/:leaveId',isAuth,expressAsyncHandler(async(req,res)=>{
    const existLeave= await leave.findById(req.params.leaveId);
    if(existLeave){
      existLeave.date=req.body.Leavedata.date
      existLeave.reason=req.body.Leavedata.reason
      await existLeave.save();
      res.send(existLeave)
    }
    else{
        res.send("Leave request can't found")
    }
}));
leaveRouter.delete('/deleteLeave/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const Leave= await leave.findById(req.params.id);
    if(Leave){
        await leave.deleteOne({_id:req.params.id});
        res.send("Successfuly deleted")
    }
}));
leaveRouter.put('/acceptLeave/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const existLeave= await leave.findById(req.params.id);
    if(existLeave){
        console.log(req.body.status)
        existLeave.status=req.body.status;
        await existLeave.save();
        res.send("Update Leave")
    }
}))
export default leaveRouter;