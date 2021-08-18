const mongoose = require('mongoose')
const connectUrl = "mongodb+srv://Amit852852:tPiKW10Flm7VXY4P@cluster0.ihyy5.mongodb.net/INFocusTube?retryWrites=true&w=majority";

const connectToDb = async()=>{
    await mongoose.connect(connectUrl,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then((res)=>console.log('server connected to database'))
    .catch(err=>console.log(err))
}
    
module.exports = {connectToDb}
