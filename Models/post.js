const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    userId:{
      type:String,
      required:true
    },
    likes:{
      type:Array,
      default:[]
    },
    unlike:{
      type:Array,
      default:[]
    },
    title:{
        type:String,
        require:true
    },
    img:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    }
    
},{timestamps:true})

const Post = mongoose.model("Post",postSchema)

module.exports = Post