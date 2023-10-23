import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import user from "./models/User.js";
import data from "./data.js";
import bcrypt from 'bcryptjs';
import userRoutes from "./routes/userRoutes.js";
import wardRoutes from "./routes/wardRoutes.js";
import ward from "./models/Wards.js";
import leaveRouter from "./routes/leaveRoutes.js";
import swapRouter from "./routes/swapRoutes.js";

dotenv.config(); //is used to load and configure environment variables from a .env file in a Node.js application using the dotenv package.
const app=express(); //Create an Express Application
app.use(express.json()); //used to set up middleware in an Express.js application to parse JSON data sent in the request body.
mongoose.connect(process.env.MONGODB_URL).then(()=>{   //.then --> run the body, after connected to the database
    console.log("connected to the database");
}).catch(err=>{
    console.log(err.message);
})
app.get('/api/seeduser',async(req,res)=>{
    await user.deleteMany({});
    const createduser=await user.insertMany(data.users)
    res.send(createduser);
})
app.get('/api/seedwards',async(req,res)=>{
    await ward.deleteMany({});
    const createdwards=await ward.insertMany(data.wards)
    res.send(createdwards);
})
app.use('/api/swap',swapRouter);
app.use('/api/leave',leaveRouter)
app.use('/api/user',userRoutes);
const port= process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log("listen port");
})

app.use('/api/wards',wardRoutes);


