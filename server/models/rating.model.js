const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rate: {
        type: Number,
        default: 0,
        max: 10,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expireAfterSeconds :  3600
    }

})

const Rating = mongoose.model('ratings', ratingSchema)
module.exports = Rating