const mongoose=require("mongoose");

const newsSchema= new mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    urlToImage:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    view:{
        type:Number,
        default:0
    },
    like:{
        type: Array,
        default:[]
    },
    art:{
        type: Array,
        default:[]
    }
})

const userSchema= new mongoose.Schema({
 id:{
    type: String,
    required:true
 },
 role:{
    type:String,
    default:"user"
 }
})

// Creating new collection
const News = new mongoose.model("Newsdata",newsSchema);
const User = new mongoose.model("Users",userSchema);
module.exports= {News,User};