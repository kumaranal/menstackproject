const mongoose=require('mongoose')
const schema=mongoose.Schema;

let User=new schema({
    name:{
        type:String
    },
    gmail:{
        type:String
    },
    password:{
        type:String
    },
    confirm_password:{
        type:String
    }
},
    {
        collection:"user"
    }
)



module.exports=mongoose.model("user",User)