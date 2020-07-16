const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const Report = mongoose.model('Report', reportSchema)
module.exports = Report