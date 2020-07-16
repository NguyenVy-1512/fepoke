// const mongoose = require('mongoose')
// const express = require('express')
// const uploadRoute = express.Router()
// const request = require('request')
// const fs = require('fs')
// const base64 = require('64')

// const uploadSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     data:{
//         type: String,
//         required: false
//     }
// })

// const Upload = mongoose.model('Upload', uploadSchema)
// module.exports = Upload

// uploadRoute.post('/', (req, res)=>{
//     console.log(req.body.imgPath)
//     const img = new Buffer.from(fs.readFileSync(req.body.imgPath))
    
//     // await upload2IBB(img, function(url){
//     //     console.log(url)
//     // })
//     const uploadFile = new Upload({
//         name: req.body.name,
//         data: upload2IBB(imgData, function(err, body){
//             if(err){
//                 console.log(err)
//             } else {
//                 return body
//             }
//         })
//     })
//     const result = uploadFile.save()
//     res.send(result)
// })

// function upload2IBB(image, callback){
//     request.post({
//         url: 'https://api.imgbb.com/1/upload?key=' + process.env.IMGBB_API_KEY,
//         form: {
//             image: image
//         }
//     }, function (err, response, body) {
//         if (err || response.statusCode !== 200) {
//             return callback(error || {statusCode: response.statusCode});
//           }
//           callback(null, JSON.parse(body))
//     })
// }

// module.exports = uploadRoute