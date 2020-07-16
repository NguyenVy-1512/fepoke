const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    productid: [{
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true
    }],
    quantity: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    }
})

const Order = mongoose.model('orders', orderSchema)
module.exports = Order