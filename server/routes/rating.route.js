const express = require('express')
const Rating = require('../models/rating.model')
const ratingRoute = express.Router()
const Product = require('../models/product.model')

ratingRoute.post('/', async (req,res)=>{
    try {
        // if (Rating.find({userID: req.body.userID}) == null && Rating.find({productID: req.body.productID}) == null){
            const newRating = new Rating({
                userID: req.body.userID,
                productID: req.body.productID,
                rate: req.body.rate,
                content: req.body.content
            })
            const result = await newRating.save()
            var rate ;
            const product = await Product.findById(req.body.productID);
            const rating = await Rating.find({productID: req.body.productID})
            for(var i=0; i < rating.length; i++)
            {
                rate += rating.rate
            }
            rate = rate/rating.length
            product.view = rate
            await product.save()
            res.send(result)
        // }
        // else
        // {
        //     res.rating.rate = req.body.rate
        //     res.rating.content = req.body.content
        //     const result = await res.rating.save()
        //     res.send(result)
        // }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

ratingRoute.get('/:id', async(req,res)=>{
    try{
        const rating = await Rating.findById(req.params.id)
        res.status(200).json(rating)
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

ratingRoute.get('/user/:id', async(req,res)=>{
    try{
        const rating = await Rating.find({userID: req.params.id})
        res.status(200).json(rating)
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

ratingRoute.patch('/:id',getRating, async (req, res)=>{
    if(req.body.rate !=null){
        res.rating.rate = req.body.rate
    }
    if(req.body.content !=null){
        res.rating.content = req.body.content
    }
    try {
        const updaterating = await res.rating.save()
        var rate = 0 ;
        const product = await Product.findById(res.rating.productID);
        const rating = await Rating.find({productID: res.rating.productID})
        for(var i=0; i < rating.length; i++)
        {
            rate = rate + rating[i].rate
        }
        rate = rate / rating.length
        product.view = rate
        await product.save()
        res.json(updaterating)
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

async function getRating(req, res, next){
    let rating
    try {
        rating = await Rating.findById(req.params.id)
        if (rating == null){
            return res.status(404).json({message: `Can't find product!`});
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    res.rating = rating
    next()
}

module.exports = ratingRoute