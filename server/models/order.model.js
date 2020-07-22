const mongoose = require('mongoose')
const Product = require('./product.model')

const orderSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    email:{
        type: String,
        required: false
    },
    productid: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Product'
    }],
    quantity: [{
        type: Number,
        required: false
    }],
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    total: {
        type: Number,
        required: false
    },
    name: [{
        type: String,
        required: false
    }],
    paid: {
        type: Boolean,
        required: false,
        default: false
    }
})

const Order = mongoose.model('orders', orderSchema)
module.exports = Order