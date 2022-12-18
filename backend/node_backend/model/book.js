const mongoose=require('mongoose')
const schema=mongoose.Schema;

let book=new schema({
    id:mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        
    },
    password:{
        type:String
    },
    phone_no:{
        type:String,
        
    },
    profile_image:{
        type:String
    },
    name:{
        type:String,
       
    },
    dob:{
        type:String
    }
},
    {
        collection:"books"
    }
)

book.index( { email: 1, password: 1, phone_no: 1 }, {unique: true});

module.exports=mongoose.model("Book",book)
