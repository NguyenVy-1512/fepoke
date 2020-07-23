const express = require('express')
const userRoute = express.Router()
const crypto = require('crypto')
const nodeMailer = require('nodemailer')
const auth = require('../middleware/auth')
const User = require('../models/user.model')
const token2verify = require('../models/token2verify.model')
const bCrypt = require('bcrypt')

//get all user
userRoute.get('/', async (req,res)=>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// get one user
userRoute.get('/:id', getUser, async (req, res)=>{
    res.status(200).json(res.user)
})

//create/signup user
userRoute.post('/signup', async (req, res)=>{
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            role: req.body.role,
            address: req.body.address
        })
        // if(user){
        //     return res.status(400).send({msg: 'Email da duoc su dung boi tai khoan khac'})
        // }

        //const token = await user.generateAuthToken()
        //res.status(201).json({user, token})
        await user.save((err)=>{
            if(err){
                res.status(400).json({message: err.message})
            }
            const tokenv = new token2verify({userID: user._id, token: crypto.randomBytes(16).toString('hex'), func: "verify"})
            tokenv.save((err)=>{
                if(err){
                    res.status(500).json({message: err.message})
                }
                 const transporter = nodeMailer.createTransport({service: 'Gmail', auth: {user: process.env.MAILER_EMAIL, pass: process.env.MAILER_PASS}})
                 const mailOptions = { from: 'robot', to: user.email, subject: 'Account Verification', text: 'Please verify your account by clicking the link: \nhttps:\/\/' + 'pokeshop.cf' + '\/verify\/' + user._id + '\n'}
                 transporter.sendMail(mailOptions, (err)=>{
                     if(err){
                         return res.send({msg: err.message})
                     }
                     res.status(200).json({msg: `A Verification email has been send to ` + user.email + `.`})
                 })
                console.log(`verify token: `, tokenv.token)
                console.log(process.env.MAILER_EMAIL, process.env.MAILER_PASS)
            })
        })
        //res.status(200).send()
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

userRoute.post('/verify/:id', getUser, async(req, res) =>{
    try{
        res.user.isVerified = true;
        res.user.save((err)=>{
            if(err){
                res.status(500).json({message: err.message})   
            }
            res.status(200).json('xác thực thành công')
        })
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
})

userRoute.post('/resetpassword', async (req, res)=>{
    try {
        const user = User.findOne({email: req.body.email}).exec(async function(err, result){
            if(!result){
                return res.status(404).json({message: 'Unable to find user!'})
            }
            // const tokenreset = new token2verify({userID: user._id, token: crypto.randomBytes(16).toString('hex'), func: "resetpass"})
            tempPass = crypto.randomBytes(8).toString('hex')
            result.password = tempPass
            await result.save((err)=>{
                if(err){
                    return res.status(500).send({message: err.message})
                }
                const transporter = nodeMailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: process.env.MAILER_EMAIL,
                        pass: process.env.MAILER_PASS
                    }
                })
                const mailOptions = { 
                    from: 'robot',
                    to: result.email,
                    subject: 'Account Password Reset',
                    html: 'Hello ' + result.name + '!\nChung toi da nhan duoc yeu cau reset password tu ban. Hay dang nhap voi password tam ben duoi va doi lai mat khau ngay lap tuc!\nPassword cua ban la: ' + tempPass
                }
                transporter.sendMail(mailOptions, (err)=>{
                    if(err){
                        return res.send({message: err.message})
                    }
                    return res.status(200).send({message: 'A Verification email has been send to ' + user.email + '.'})
                })
            })
        })
        res.status(200).json({message: 'An email password has sent to your email!'})
    } catch (error) {
        res.json({message: error.message})
    }
})

userRoute.post('/reset/:id', getUser, async (req, res)=>{
    try{
      
        res.user.password = req.body.password;
        
        res.user.save((err)=>{
            if(err){
                res.status(500).json({message: err.message})   
            }
            res.status(200).json('xác thực thành công')
        })
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
})

//login user
userRoute.post('/login', async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findByCredentials(email,password)
        if(!user){
            return res.status(401).json({message: `Login failed! Check authentication credentials`})
        }
        if(!user.isVerified){
            return res.status(401).send({type: 'not-verified', message: 'You account not have been verified!!!'})
        }
        // if(user.role == 'admin'){
        //     res.redirect(process.env.SERVER_URL + '/admin/dashboard')
        // }
        const token = await user.generateAuthToken()
        res.status(200).json({user, token})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//user profile
userRoute.get('/profile/:id',getUser, async (req, res)=>{
    res.send(res.user)
})

//logout
userRoute.post('/logout', auth, async function(req, res){
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).send()
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//logout all device
userRoute.post('/logoutall', auth, async function(req, res){
    try{
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.status(200).send()
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//update one user
userRoute.patch('/changeprofile', auth, async (req,res)=>{
    try {
        if(req.body.name != null){
            req.user.name = req.body.name
        }
        if(req.body.phone != null){
            req.user.email = req.body.email
        }
        if(req.body.address != null){
            req.user.address = req.body.address
        }
        await req.user.save()
        res.status(201).json({message: `Success!`})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

userRoute.patch('/changepassword', auth, async (req, res)=>{
    try {
        if((req.body.password1 != null) && (req.body.password2 !=null)){
            req.user.password = req.body.password1
        }
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.status(201).json({message: `Success! Please login again!`})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//delete one user
userRoute.delete('/:id', getUser, async (req,res)=>{
    try {
        await res.user.remove()
        res.status(200).json({message: `Delete this user!!!`})
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

async function getUser(req, res, next){
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null){
            return res.status(404).json({message: `Can't find user!!!`})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})   
    }

    res.user = user
    next()
}

module.exports = userRoute