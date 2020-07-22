const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

const Category = mongoose.model('categories', categorySchema)
module.exports = Category