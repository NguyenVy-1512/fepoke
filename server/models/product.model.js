const mongoose = require('mongoose')
const request = require('request')
const fs = require('fs')
const ratingSch = require('../models/rating.model')
const viewSch = require('../models/view.model')
const categorySch = require('../models/category.model')
 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        default: 'USD'
    },
    description: {
        type: String,
        required: true
    },
    qty:{
        type: Number,
        required: true
    },
    imgurl: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    view: {
        type: Number,
        ref: 'Rating',
        default: "0"
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
})

function foo(image, fn){
    request.post({
        url: 'https://api.imgbb.com/1/upload?key=' + process.env.IMGBB_API_KEY,
        form: {
            image: image
        }
    }, (err, res, body)=>{
        if (err) {
            return res.send({
                message: `upload failed: ` + err
            });
        }
        // fn(JSON.parse(body).data.url)
        console.log(`statusCode: ${res.statusCode}`)
        console.log(`body: ${body}`)
    })
}

productSchema.pre('save', async function (next) {
    // const img = new Buffer.from(fs.readFileSync(this.imgurl)).toString('base64')
    // // console.log(img)
    // await foo(img, function(url){
    //     console.log(url)
    //     productSchema.imgurl = url
    // })
    console.log(this.category)
    // for (const category of this.category) {
    //     console.log(category)
    // }
    const idproduct = this._id
    for (const key in this.category) {
        if (this.category.hasOwnProperty(key)) {
            const cate = categorySch.findByIdAndUpdate(this.category[key], {$addToSet: {products: idproduct}}, {new: true}, (err, cate)=>{
                cate.save()
            })
            
        }
    }
    // this.category.forEach(element => {
    //     categorySch.findByIdAndUpdate(element, {$addToSet: {products: next._id}}, {new: true})
    // });
})

const Product = mongoose.model('products', productSchema)
module.exports = Product