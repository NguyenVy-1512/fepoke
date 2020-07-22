const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    content: {
        type: String,
        required: false,
        enum: ['paypal', 'none']
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 1800 //30p, 3h 10800
    }

})

const Payment = mongoose.model('payments', paymentSchema)
module.exports = Payment