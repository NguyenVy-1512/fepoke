const mongoose = require('mongoose')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: false,
        enum: ['admin', 'user'],
        default: 'user'
    },
    orderIDs: [{
        orderID: {
            type: String
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bCrypt.hash(this.password, SALT_WORK_FACTOR)
    }
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    user.tokens = this.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    if (!user){
        throw new Error({error: 'Invalid login credentials'})
    }
    const isPasswordMatch = await bCrypt.compare(password, user.password)
    if (!isPasswordMatch){
        throw new Error({error: 'Invalid login credentials'})
    }
    return user
}

const User = mongoose.model('users', userSchema)

module.exports = User