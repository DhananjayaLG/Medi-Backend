import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils.js";
import user from '../models/User.js';
import {ObjectId} from 'mongodb';
const userRoutes= express.Router();
userRoutes.post("/login",expressAsyncHandler(async(req,res)=>{
    try{
        const User=await user.findOne({Email:req.body.email}).exec();
    console.log(User)
    if(User){
        if(bcrypt.compareSync(req.body.password,User.password)){
            console.log(User.role)
            res.send({Email:User.Email,role:User.role,name:User.Name,token:generateToken(User)});
        }
        else{
            res.send({message:"Incorrect Email or Password "})
        }
    }
    else{
        res.send({message:"User Not Found"})
    }
    }
    catch(err){
        res.send(err.message)
    }
    
}));
userRoutes.put('/addUser',expressAsyncHandler(async(req,res)=>{
console.log(req.body.role)
    const newUser=new user({
        "ContactNo": req.body.contactNumber,
       "Email": req.body.email,
       "Name": req.body.name,
       "Address":req.body.address,
       "Specialization": req.body.specialization,
       "WardName": req.body.ward, 
       "Type":req.body.doctorType,
       "ID":req.body.id,
       "role":req.body.role,
       });
       const created= await newUser.save();
           res.send(newUser)
       }
     
   ));

userRoutes.get('/getDoctors',expressAsyncHandler(async(req,res)=>{
    const Doctors=await user.find({role:"doctor"});
    let document=[];
    if(Doctors){
        for(const i of Doctors){
            const u= {
    Email:i.Email,
    role:i.role,
    Name:i.Name,
    Type:i.Type,
    WardName:i.WardName,
    Specialization: i.Specialization, 
    Status: i.Status,
    Address:i.Address,
    ContactNo: i.ContactNo,
    DoctorID:i.ID,
    _id:i._id
            }
            document.push(u)
        }
        res.send(document)
    }
   else{
    res.send({message:"can't fetch"})
   }
}));
userRoutes.get('/getDoctorsNames',expressAsyncHandler(async(req,res)=>{
    const Doctors=await user.find({role:"doctor"});
    let document=[];
    if(Doctors){
        for(const i of Doctors){
            const u= {
    
    Name:i.Name,
    _id:i._id
            }
            document.push(u)
        }
        res.send(document)
    }
   else{
    res.send({message:"can't fetch"})
   }
}));
userRoutes.get('/getConsultants',expressAsyncHandler(async(req,res)=>{
    const consultants=await user.find({role:"consultant"});
    let document=[];
    if(consultants){
        for(const i of consultants){
            const u= {
    Email:i.Email,
    role:i.role,
    Name:i.Name,
    Type:i.Type,
    WardName:i.WardName,
    Specialization: i.Specialization, 
    Status: i.Status,
    Address:i.Address,
    ContactNo: i.ContactNo,
    ConsultantID:i.ID,
    _id:i._id
            }
            document.push(u)
        }
        res.send(document)
    }
   else{
    res.send({message:"can't fetch"})
   }
}));
userRoutes.get('/getConsultantsNames',expressAsyncHandler(async(req,res)=>{
    const consultants=await user.find({role:"consultant"});
    let document=[];
    if(consultants){
        for(const i of consultants){
            const u= {
    
                Name:i.Name,
                _id:i._id
                        }
                        document.push(u)
        }
        res.send(document)
    }
   else{
    res.send({message:"can't fetch"})
   }
}));
userRoutes.delete('/deleteUser',expressAsyncHandler(async(req,res)=>{
    const { ids } = req.query;
    if (!ids) {
        return res.status(400).json({ error: 'IDs parameter is missing' });
      }
    
     
      let documents=[];
      const idsToDelete = ids.split(',');
      for (const id of idsToDelete) {
        try {
        const   document = await user.findById(id);
          if (document) {
            documents.push(document); // Add the fetched document to the array
          }
        } catch (error) {
          console.error(`Error fetching document with ID ${id}: ${error.message}`);
        }
      }
      for(const u of documents){
        try{
            const deleted= await user.deleteOne({_id:u._id});
            console.log(deleted)
        }
        catch(err){
            console.log("error")
        }
      }
      res.send("Success")
      
}))
export default userRoutes;