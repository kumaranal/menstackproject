const express=require("express");
const path=require('path');
const cors=require("cors");
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const bcrypt = require("bcryptjs");
const fileupload=require('express-fileupload');
const dotenv = require('dotenv')
require('dotenv').config({path:'.env'});


//mongo path define

mongoose.Promise=global.Promise;

    mongoose.connect(process.env.dbApi,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("success");
        }
    })

//port setting
const routerpath= require("./node_backend/routes/book.routes");
const app=express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended:false
}));
///temp file created
app.use(fileupload({
    useTempFiles:true
}))
app.use(cors());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

//     res.header(
//         'Access-Control-Expose-Headers',
//         'x-access-token, x-refresh-token'
//     );

//     next();
// });

app.use(express.static(path.join(__dirname,'dist/bookstore')));
//app route setting, we make this /api so every site link should have /api
app.use('/api',routerpath);
//404 page
app.use((req,res,next)=>{
    next(createError(404));
});
//base route
app.get('/',(req,res)=>{
    res.send('invalid endpoint');
})
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/bookstore/index.html'));
})
app.use(function(err,req,res,next){
    console.log(err.message);
    if(!err.statusCode)err.statusCode=500;
    res.status(err.statusCode).send(err.message);
});
//port creation
const port= process.env.PORT || 9500;
//for host in internet


app.listen(port,()=>{
    console.log(`port ${port}`);
});
