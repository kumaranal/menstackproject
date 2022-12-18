const express=require("express");
const app=express();
const routerpath=express.Router();
let book=require("../model/book");
let user=require("../model/user");
const multer=require('multer');
 const hookf= require( "../controller/controlling");
 const bycriptfn=require("../middlewares/bycript");
 const jwtfn=require("../middlewares/jwtauthcode");
 const jwtcheckfn=require("../middlewares/jettokenauthentic");
 const path=require('path');

//create api
// routerpath.post ('/add-profile',hookf.postfn);


//get all data
routerpath.get('/',hookf.getfn);

//get book by id
routerpath.get('/find-profile/:id',hookf.findfn);

// update
routerpath.put('/update-profile/:id',hookf.updatefn);

//delete
routerpath.delete('/delete-profile/:id',hookf.deletefn);



//user registration
routerpath.post('/registration-user',hookf.registrationfn);

//user login
routerpath.post('/login-user',hookf.loginfn);

//myProfile login
// routerpath.get('/find-profile',jwtfn,hookf.myprofile);
routerpath.post('/find-profile1',jwtcheckfn,hookf.myprofile1);

module.exports=routerpath;