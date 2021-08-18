const router = require('express').Router()
const WatchLater = require('../Models/watchlater')

router.route('/')
.post(async(req,res)=>{
    let saveDataToDB = new WatchLater({
      postId:req.body.postId,
      currentUserId: req.body.currentUserId,
      userId: req.body.userId,
      channelName: req.body.channelName,
      title: req.body.title,
      img: req.body.img,
      userImg: req.body.userImg
      })

    try{
      saveDataToDB = await saveDataToDB.save();
      res.status(200).json({success:true,message:"data has been saved"})
    }catch(error){
      res.json({success:false,error:error.message})
    }
})


router.route('/:id')
.get(async(req,res)=>{
    console.log(req.params.id)
    try{
      const getallWatchVideo = await WatchLater.find({currentUserId:req.params.id})
      res.status(200).json(getallWatchVideo)
    }catch(error){
      res.json({success:false , error:error.message})
    }

})

.delete(async(req,res)=>{
  console.log(req.params.id)
  try{
    await WatchLater.findByIdAndDelete(req.params.id)
    res.status(200).json({success:true,message:"successfully deleted from watchLater "})
  }catch(error){
    res.json({success:false , error:error.message})
  }
})


module.exports = router;

