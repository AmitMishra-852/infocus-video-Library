const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
    postId:{
        type: String,
        required: true 
    },
    currentUserId:{
        type: String,
        required: true 
    },
    userId: {
        type: String,
        required: true
    },
    channelName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    userImg: {
        type: String,
        required: true
    }
},{timestamps:true})

const History = mongoose.model("History", historySchema)

module.exports = History
