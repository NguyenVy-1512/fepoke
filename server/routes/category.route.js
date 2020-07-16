const express = require('express')
const Category = require('../models/category.model')
const categoryRoute = express.Router()
const Product = require('../models/product.model')

categoryRoute.get('/', async (req, res)=>{
    try {
        const categoryList = await Category.find()
        console.log(categoryList)
        res.status(200).json(categoryList);
    } catch (err) { 
        res.status(500).json({message: err.message});
    }
})

categoryRoute.get('/:id', getcategory, async (req, res)=>{
    // console.log(req.params.name)
    //  Category.findOne({name: req.params.name}, function (err, data) {
    //      if(err){
    //      res.status(400).json({message: error.message})
    //      }
    //      res.status(200).json(data)
    //      })
    res.status(200).json(res.category)

    
})

categoryRoute.get('/cate/:name', async (req, res)=>{
     console.log(req.params.name)
      Category.findOne({name: req.params.name}, function (err, data) {
          if(err){
          res.status(400).json({message: error.message})
          }
          res.status(200).json(data)
          })
    //res.status(200).json(res.category)

    
})
async function getcategory(req,res,next){
    let category
    try{
        category = await Category.findById(req.params.id)
        if(category == null){
            return res.status(404).json({message: `Don't have category!!!`})
        }
    } catch (err){
        return res.status(500).json({message: err.message});
    }
    res.category = category
    next()
}

categoryRoute.post('/', async (req,res)=>{
    try {
        const newCate = new Category({
            name: req.body.name
        })
        const result = await newCate.save()
        res.send(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = categoryRoute