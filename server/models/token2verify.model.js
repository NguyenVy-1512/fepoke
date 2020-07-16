const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token:{
        type: String,
        required: true
    },
    func:{
        type: String,
        required: true,
        enum: ["verify", "resetpass"]
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 1800 //30p, 3h 10800
    }
})

const token2verify = mongoose.model('token2verify', tokenSchema)
module.exports = token2verify