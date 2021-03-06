const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    UserID: {
        type: String,
        required: false,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 1800 //30p, 3h 10800
    }
})
    

// notificationSchema.statics = {
//     async pushNtf(obj){
//         const ntf = await this.findOne({
//             fromUserID: obj.fromUserID,
//             act: obj.act,
//             productID: obj.productID,
//             commentID: obj.commentID || null,
//             status: obj.status
//         })
//         if(ntf){
//             console.log(ntf)
//             return await ntf.updateOne({
//                 $addToSet: {
//                     toUserID: obj.toUserID
//                 }
//             })
//         }
//         const newNtf = new Notification({
//             fromUserID: obj.fromUserID,
//             toUserID: obj.toUserID,
//             act: obj.act,
//             productID: obj.productID,
//             commentID: obj.commentID,
//             status: obj.status
//         })
//         return await newNtf.save()
//     },
//     async getNtf(userID, page, limit){
//         try {
//             const ntf = await Notification.aggregate([
//                 {
//                     $match: {
//                         fromUserID: mongoose.Schema.Types.ObjectId(userID)
//                     }
//                 },{
//                     $lookup: {
//                         from: 'Product',
//                         localField: 'productID',
//                         foreignField: '_id',
//                         as: 'productID'
//                     }
//                 },{
//                     $lookup: {
//                         from: 'Comment',
//                         localField: 'commentID',
//                         foreignField: '_id',
//                         as: 'commentID'
//                     }
//                 },{
//                     $lookup: {
//                         from: 'User',
//                         localField: 'toUserID',
//                         foreignField: '_id',
//                         as: 'toUserID'
//                     }
//                 },{
//                     $addFields:{
//                         valid: {
//                             $eq: [{$size: {$ifNull:['$productID', []]}}, 1]
//                         }
//                     }
//                 },{
//                     $match: {
//                         valid: true
//                     }
//                 },{
//                     $sort: {updateAt: -1}
//                 },{
//                     $skip: Number(page*limit)
//                 },{
//                     $limit: Number(limit)
//                 }
//         ])
//         return ntf
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

// notificationSchema.statics = {
//     async pushNotify(obj){
//         try {
//             const ntf = await Notification.findOne({
//                 fromUserID: obj.fromUserID,
//                 act: obj.act,
//                 productID: obj.productID,
//                 commentID: obj.commentID || null,
//                 status: obj.status
//             })
//             if(ntf){
//                 console.log(ntf);
//                 return await ntf.updateOne({
//                     $addToSet: {
//                         toUser: obj.toUser
//                     }
//                 })
//             }
//             const newNtf = new this(obj)
//             return await newNtf.save()
//         } catch (error) {
//             console.log(error.message)
//         }
//     },
    
// } 

const Notification = mongoose.model('notifications', notificationSchema)
module.exports = Notification