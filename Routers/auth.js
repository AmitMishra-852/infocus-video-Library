const router = require('express').Router()
const User = require('../Models/user')

router.route('/')
    .post(async (req, res) => {
        let getUserData = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.cloudinaryImageUrl
        })
        try {
            getUserData = await getUserData.save()
            res.status(200).json({ "success": true, getUserData })
        } catch (err) {
            res.status(400).json({ "success": false, error:err.message })
        }
    })


const AuthVerify = (req,res,next) => {
   const token = req.headers.authorization;
   console.log(token)
   if(token === "abcdefghi"){
       return next()
   }else{
       res.status(401).json({success:false, error: "unauthorize access , please add the token"})
   }
}


router.route('/login')
.post(AuthVerify, async (req, res) => {
    const {email , password} = req.body
    console.log(email)
    console.log(password)
    
    if(!email || !password){
      res.status(400).json({success:false , error:"please enter your email and password"})
    }
    try {
        const getUser = await User.findOne({email})

        if(!getUser){
            res.status(404).json({ success: false, error: "invalid credentials" })
        }

        if (getUser.password.includes(password)) {
            res.status(200).json({success:true , user:getUser})
        } else {
            res.status(404).json({success:false , error:'invalid credentials'})
        }

    } catch (error) {
        res.status(400).json({success:false , error:error.message})

    }
})


module.exports = router;