const router = require('express').Router()
const User = require('../Models/user')

router.route('/')
.get(async(req,res)=>{
    try{
        getAllUser = await User.find({})
        res.status(200).json(getAllUser)
    }catch(err){
        res.json(err)
    }
})

router.route('/:id')
.get(async(req,res)=>{
    console.log(req.params.id)
    try{
        const singleUser = await User.findById(req.params.id)
        res.status(200).json(singleUser)
    }catch(err){
        console.log(err)
    }
})



module.exports = router;