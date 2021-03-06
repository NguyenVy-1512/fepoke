const express = require('express')
const orderRoute = express.Router()
const Order = require('../models/order.model')
const Notifi = require('../models/notification.model')
const User = require('../models/user.model')
const Product = require('../models/product.model')

orderRoute.get('/', async (req,res)=>{
    try{
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

orderRoute.get('/:id', getOrders, async(req,res)=>{
     res.status(200).json(res.order);
})

orderRoute.get('/user/:id', async(req,res)=>{
    try{
        const orders = await Order.find({userid: req.params.id})
        res.status(200).json(orders)
    } catch (err){
        res.status(500).json({message: err.message});
    }
})
orderRoute.post('/vetifi/:id', getOrders, async(req,res)=>{
    try{
        for(var i=0; i< res.order.productid.length; i++)
        {
            const product = await Product.findById(res.order.productid[i])
            product.qty = product.qty - res.order.quantity[i];
            await product.save();
        }
        res.order.paid = true;
        const confirm = res.order.save()
        res.status(200).json(confirm)
    }catch(err){
        res.status(500).json({message: err.message});
    }
})
orderRoute.post('/add',async (req,res)=>{
    try{
        var total = 0;
        var name = [];
        for(var i=0; i<req.body.productid.length; i++){
            const product = await Product.findById(req.body.productid[i])
            product.sale = product.sale + 1;
            await product.save()
            console.log(req.body.productid[i])
            console.log(req.body.quantity[i])
            name.push(product.name)
            total = total + (product.price * req.body.quantity[i])
        }
        const order = new Order({
            userid: req.body.userid,
            productid: req.body.productid,
            quantity: req.body.quantity,
            phone: req.body.phone,
            address: req.body.address,
            email: req.body.email,
            total: total,
            name: name
        })
        await order.save()
        res.status(200).json(order);
    } catch (err){
        res.status(400).json({message: err.message});
    }
})

orderRoute.patch('/:id', getOrders, async (req, res)=>{
    if(req.body.phone !=null){
        res.order.phone = req.body.phone
    }
    if(req.order.address !=null){
        res.order.address = req.body.address
    }
    if(req.body.email != null){
        res.order.email = req.body.email
    }
    try {
        const updateOrder = await res.order.save()
        res.json(updateOrder)
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

orderRoute.delete('/:id', getOrders, async (req,res)=>{
    try {
        await res.order.remove()
         res.json({message: `Delete this order!!!`});
    } catch (error) {
        res.status(500).json({message: err.message});
    }
})

async function getOrders(req,res,next){
    let order
    try{
        order = await Order.findById(req.params.id)
        if(order == null){
            return res.status(404).json({message: `Don't have order!!!`})
        }
    } catch (err){
        return res.status(500).json({message: err.message});
    }
    res.order = order
    next()
}

orderRoute.post('/ntf', async (req, res)=>{
    try {
        const obj = new Notifi({
            fromUserID: '5df0a77bd64de81f3cb5fe9b',
            toUserID: '5df0a86b9456bd2534df2e95',
            act: 'comment',
            productID: '5dd41958d7b26021689b8219',
            commentID: null,
            status: 'SEEN'
        })
        const ntf = await Notifi.pushNtf(obj)
        res.status(200).json({data: ntf})
    } catch (error) {
        console.log(error)
    }
})

module.exports = orderRoute