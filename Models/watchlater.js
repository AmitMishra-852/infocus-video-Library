const mongoose = require('mongoose')

const WatchLaterSchema = new mongoose.Schema({
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

const WatchLater = mongoose.model("WatchLater" , WatchLaterSchema)

module.exports = WatchLater;
