const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    content: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

const replySchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    commentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    },
    content: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

commentSchema.virtual('replies', {
    ref:'Reply',
    localField: '_id',
    foreignField: 'commentID'
})

const comment = mongoose.model('coments', commentSchema)
const reply = mongoose.model('replys', replySchema)

module.exports = comment
module.exports = reply