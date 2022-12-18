const express=require("express");
const app=express();
const routerpath=express.Router();
let book=require("../model/book");
let User=require("../model/user");
const multer=require('multer');
const bcrypt = require("bcryptjs");
const jwtfn=require("../middlewares/jwtauthcode");
const jwtcheckfn=require("../middlewares/jettokenauthentic");
const jwt=require("jsonwebtoken");
const mongoose =require('mongoose');
const fileupload=require('express-fileupload');
const user = require("../model/user");
const cloudinary=require('cloudinary').v2;
const JWTCODE="mycode";
const dotenv = require('dotenv')
require('dotenv').config({path:'.env'});


cloudinary.config({ 
    cloud_name: process.env.cloudName, 
    api_key: process.env.cloudKey, 
    api_secret: process.env.cloudSecret
  });

 const getpost= async(req,res)=>{

    try{
        const post=req.body;
        const newpost=new postMessage(post);
        await newpost.save();     
          res.status(200).json({message:"Success"});
            }
            catch(err){
                res.status(404).json({message: err.message});
        
            }     
    }

const getfn=(req,res)=>{
  let datas="vns";
  book.find((error,data)=>{
      if(error){
          return next (error)
      }else{
          res.status(200).json(data)
      }
  });
};


const findfn=(req,res)=>{
    console.log("find");
  book.findById(req.params.id,(error,data)=>{
      if(error){
          return next (error)
      }else{
          res.status(200).json(data)
      }
  });
};



const updatefn=(req,res,next)=>{
    console.log("update");
console.log("req",req.body);
let result;
  const file=req.files.profile_image;
        cloudinary.uploader.upload(file.tempFilePath,(err,data)=>{
            if(err){
                console.log(err);
                result=""
            }
            else{
                result=data; 
            }

                const bookfile=new book({
                    _id:req.body._id,
                    email:req.body.email,
                    password:req.body.password,
                    phone_no:req.body.phone_no,
                    profile_image:result.url,
                    name:req.body.name,
                    dob:req.body.dob,
                    })
                    book.findByIdAndUpdate(bookfile._id,{$set: bookfile},{new:true},(error,data)=>{
                              if(error){
                                console.log(error);
                                  return next (error)
                              }else{
                                  res.status(200).json(data)
                                  console.log("update success");
                              }
                });
               
        });
}





const deletefn=(req,res,next)=>{
  book.findByIdAndRemove(req.params.id,(error,data)=>{
      if(error){
          return next (error)
      }else{
          res.status(200).json({msg:data})
          console.log("delete success");
      }
  });
};

     
const registrationfn = async (req, res, next) => {
    try {
         console.log("bookfile picture",req)

        console.log("bookfile picture1",req.file)
        const file=req.files.profile_image;

        cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                const bookfile=new book({
                    _id:new mongoose.Types.ObjectId,
                    email:req.body.email,
                    password:req.body.password,
                    phone_no:req.body.phone_no,
                    profile_image:result.url,
                    name:req.body.name,
                    dob:req.body.dob,
                    })
                    bookfile.save()
                    .then(result =>{
                        // console.log(result);
                        const data={
                            bookfile:{
                             _id:bookfile._id
                            }
                        }
                        const authtoken = jwt.sign({ data }, JWTCODE,{expiresIn:"1h"});
                        res.status(200).json({ msg: "Success", token: authtoken });
                    //    res.status(200).json({msg:"Success"});
                
                    })
                    .catch(err=>{
                        console.log("acsb")
                        res.status(200).json({ msg: "credential already exist" });
                        console.log(err);
                    })
                
                
            }
            // console.log(result);
        })
        
    } catch (err) {
        res.status(200).json({ msg: "credential already exist" });
        console.log("lk")
        console.log(err);
    }
}

const loginfn=async(req,res,next)=>{
    try{
        const username=await book.findOne({email:req.body.email});
        console.log("username",username.password);
        if(username.password == req.body.password){
            const data={
                username:{
                    _id:username._id
                }
            }
            const authtoken=jwt.sign(data,JWTCODE,{expiresIn:"1h"}); ///expire in 1 hour
            res.status(200).json({msg:"Success",token:authtoken});
            // res.status(200).json({msg:"Success"});
        }
        else{
            res.status(200).json({msg:"invalid login credentials"});

        }
    }catch(err){
        res.status(200).json({msg:"invalid login credentials"});
        console.log(err);
    }
  }
 const myprofile=async (req,res,next)=>{
    try{
        book.findById(req.user._id,(error,data)=>{
            if(error){
                return next (error)
            }else{
                res.status(200).json(data)
            }
        });

    }catch(err){
        console.log(err);
        res.status(200).json({msg:"inavlid user"});

    }
 }

 const myprofile1=async (req,res,next)=>{
    try{
        console.log("res api",req)
        book.findById(req.user._id,(error,data)=>{
            if(error){
                return next (error)
            }else{
                res.status(200).json(data)
            }
        });

    }catch(err){
        console.log(err);
        res.status(200).json({msg:"inavlid user"});

    }
 }

module.exports={getfn,findfn,updatefn,deletefn,registrationfn,loginfn,myprofile,myprofile1};