const router = require('express').Router()
const History = require('../Models/history')

router.route('/')
    .post(async (req, res) => {
         let history = new History({
            postId:req.body.postId,
            currentUserId: req.body.currentUserId,
            userId: req.body.userId,
            channelName: req.body.channelName,
            title: req.body.title,
            img: req.body.img,
            userImg: req.body.userImg
        })

        console.log(req.body)
        
        try {
            history = await history.save();
            res.status(200).json("successfully added in history")
        } catch (err) {
            res.json(err)
        }      

    })

router.route('/:id')
    .get(async (req, res) => {
        console.log(req.params.id)
        try {
            const getHistory = await History.findOne({ userId: req.params.id })
            res.status(200).json(getHistory)
        } catch (error) {
            res.status(200).json(getHistory)
        }
    })

    .delete(async(req,res)=>{
        console.log(req.params.id)
        try{
            await History.findByIdAndDelete(req.params.id)
            res.status(200).json({success:true,message:" successfully deleted from history"})
        }catch(error){
            res.status().json({success:false , error:error.message})
        }
    })

router.route('/currentUser/:id')
.get(async (req, res) => {
    try {
        const getAllHistory = await History.find({currentUserId:req.params.id})
        res.status(200).json(getAllHistory)
    } catch (err) { 
        res.json(err)
    }
    })    

module.exports = router

