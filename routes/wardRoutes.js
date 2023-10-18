import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import ward from '../models/Wards.js';


const wardRoutes = express.Router();
wardRoutes.get('/getWards',expressAsyncHandler(async(req,res)=>{
    const Wards=await ward.find({});
    if(Wards){
        res.send(Wards)
    }
   else{
    res.send({message:"can't fetch"})
   }
}))
wardRoutes.put('/addWard',expressAsyncHandler(async(req,res)=>{
    const newWard= new ward({
      WardID:req.body. WardID,
      ConsultantID:req.body.consultantID,
      WardName:req.body. WardName,
      NumberOfShitfs:req.body.NumberOfShifts,
      NumberOfBeds:req.body.NumberOfBeds,
    });
    const createdWard= await newWard.save();
    res.send(createdWard)
}))
wardRoutes.delete('/deleteWards',expressAsyncHandler(async(req,res)=>{
    const { ids } = req.query;
    if (!ids) {
        return res.status(400).json({ error: 'IDs parameter is missing' });
      }
    
     
      let documents=[];
      const idsToDelete = ids.split(',');
      for (const id of idsToDelete) {
        try {
        const   document = await ward.findById(id);
          if (document) {
            documents.push(document); // Add the fetched document to the array
          }
        } catch (error) {
          console.error(`Error fetching document with ID ${id}: ${error.message}`);
        }
      }
      for(const u of documents){
        try{
            const deleted= await ward.deleteOne({_id:u._id});
            console.log(deleted)
        }
        catch(err){
            console.log("error")
        }
      }
      res.send("Success")
}))

export default wardRoutes;