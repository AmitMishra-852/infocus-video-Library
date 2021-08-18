const router = require('express').Router()
const Post = require('../Models/post')

router.route('/')
    .post(async (req, res) => {
        console.log(req.body)
        try {
            let post = new Post({
                userId: req.body.userId,
                title: req.body.title,
                img: req.body.img,
                video: req.body.video
            })
            post = await post.save()
            res.status(200).json(post)
        } catch (err) {
            res.json(err)
        }
    })

    .get(async (req, res) => {
        try {
            const getAllPost = await Post.find({})
            res.status(200).json(getAllPost)
        } catch (err) {
            res.json(err)
        }
    })

router.route('/:videoId')
    .get(async (req, res) => {
        console.log("videoId",req.params.videoId)
        try {
            const getPost = await Post.findById(req.params.videoId)
            console.log("getPost",getPost)
            res.status(200).json(getPost)
        } catch (err) {
            res.json(err)
        }
    })


router.route('/likes/:id')
.put(async(req,res)=>{
    console.log(req.params.id)
    console.log(req.body.currentUserId)

    try{
        const likePost = await Post.findById(req.params.Id)
        if(!likePost?.likes.includes(req.body.currentUserId)){
            const getLikePost = await Post.findByIdAndUpdate(req.params.id,{
            $push:{likes:req.body.currentUserId}},{new:true})  
            res.status(200).json(getLikePost)    
        }else{
            const getLikePost = await Post.findByIdAndUpdate(req.params.id,{
            $pull:{likes:req.body.currentUserId}},{new:true})  
            res.status(200).json(getLikePost)  
        }

    }catch(error){
        console.log(error)
    }
})






module.exports = router;
