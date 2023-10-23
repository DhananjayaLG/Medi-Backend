import express from 'express';
import mongoose from 'mongoose';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';
import swap from '../models/Swap.js';
import user from '../models/User.js';
const ObjectId = mongoose.Types.ObjectId;
const swapRouter=express.Router();
swapRouter.get('/getswap',isAuth,expressAsyncHandler(async(req,res)=>{
    
    const user_Id= req.user._id;
    const swaps= await swap.find({sender:new ObjectId(user_Id)});
    const document=[]
    for(const sw of swaps){
        const User= await user.findById(sw.receiver.toString());
        const processed={
            _id:sw._id,
            date: sw.date,
            timePeriodfrom: sw.timePeriodfrom,
            timePeriodto:sw.timePeriodto,
            selectedDoctor: User.Name,
            selectDoctorId:sw.receiver,
            status:sw.status
        }
        document.push(processed)
    }
    res.send(document)
}))
swapRouter.post('/addswap',isAuth,expressAsyncHandler(async(req,res)=>{
    const user_Id= req.user._id;
    const newSwap= new swap({
        sender:new ObjectId(user_Id),
      date:req.body.date,
      status:"Pending",
      timePeriodfrom:req.body.timePeriodfrom,
      timePeriodto:req.body.timePeriodto,
      receiver:new ObjectId(req.body.receiver)
    })
    await newSwap.save();
    res.send(newSwap);
}));
swapRouter.put('/updateswap/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const Swap= await swap.findById(req.params.id);
    const user_Id= req.user._id;
    if(Swap){
        Swap.sender=user_Id;
        Swap.date=req.body.date;
        Swap.timePeriodfrom=req.body.timePeriodfrom;
        Swap.timePeriodto=req.body.timePeriodto;
        Swap.receiver=req.body.receiver;
       await Swap.save();
       res.send(Swap)
    }
}));
swapRouter.get('/getswaprequest',isAuth,expressAsyncHandler(async(req,res)=>{
    const user_id=req.user._id;
    const requests= await swap.find({receiver:user_id});
    const document=[];
    for(const re of requests){
        const User= await user.findById(re.sender)
        const processed={
            _id:re._id,
            date:re.date,
            senderName:User.Name,
            timePeriodfrom:re.timePeriodfrom,
            timePeriodto:re.timePeriodto,
            status:re.status
        }
        document.push(processed)
    }
    res.send(document)
}));
swapRouter.put('/acceptswapreq/:id',isAuth,expressAsyncHandler(async(req,res)=>{
    const existSwap= await swap.findById(req.params.id);
    if(existSwap){
        existSwap.status=req.body.status;
        await existSwap.save();
        res.send(existSwap)
    }
}))
export default swapRouter;