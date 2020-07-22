const express = require('express')
const productRoute = express.Router()
const Product = require('../models/product.model')
const Category = require('../models/category.model')

productRoute.get('/v1', async (req,res)=>{
    try {
        const productList = await Product.find()
        res.status(200).json(productList);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

productRoute.get('/v2/:name', async (req,res)=>{
    try {
        const productList = await Product.find().populate('category')
        res.status(200).json(productList);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

productRoute.get('/:id', getProduct, async(req, res)=>{
    res.json(res.product);
})

productRoute.post('/add', async (req, res)=>{
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.desc,
            rating: req.body.rating,
            qty: req.body.qty,
            imgurl: req.body.imgurl
        })
        await product.save(
            (err)=>{
            if(err){
                res.status(400).json({message: err.message})
            }
            for (const key in req.body.category) {
                if (req.body.category.hasOwnProperty(key)) {
                    const item = req.body.category[key];
                    product.category.push(item.id)
                        // const cat = Category.find({name: req.body.category[key]})
                        //     console.log(cat._id)
            // for (const catego of req.body.category) {
            //     console.log(this.catego)
            //     Category.findOne({name: this.catego}).distinct('name', (err, result)=>{
            //         console.log(result)
            //     })
            // }
        }}}
        )
        res.status(200).json({message: `Product added!`});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

productRoute.patch('/:id', getProduct, async (req, res)=>{
    if(req.body.desc !=null){
        res.product.description = req.body.desc
    }
    if(req.body.price !=null){
        res.product.price = req.body.price
    }
    try {
        const updateProduct = await res.product.save()
        res.json(updateProduct)
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

productRoute.delete('/:id', getProduct, async (req, res)=>{
    try {
        await res.product.remove()
         res.json({message: `Delete this product!!!`})
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

async function getProduct(req, res, next){
    let product 
    try {
        product = await Product.findById(req.params.id)
        if (product == null){
            return res.status(404).json({message: `Can't find product!`});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.product = product
    next()
}

module.exports = productRoute