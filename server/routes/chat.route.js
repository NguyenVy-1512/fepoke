const express = require('express')
const chatRoute = express.Router()
const User = require('../models/user.model')
const Noti = require('../models/notification.model')
chatRoute.get('/', async (req,res)=>{
  try {
      const chat = await Noti.find()
      res.json(chat)
  } catch (err) {
      res.status(500).json({message: err.message})
  }
})
chatRoute.get('/:id', getChat, async (req, res)=>{
  res.status(200).json(res.chat)
})
chatRoute.get('/user/:id', async (req,res)=>{
  try {
      const chat = await Noti.find({UserID: req.params.id})
      res.json(chat)
  } catch (err) {
      res.status(500).json({message: err.message})
  }
})
chatRoute.post('/', async (req,res)=>{
  try {
          const newChat = new Noti({
              UserID: req.body.UserID,
              message: req.body.message,
              name: req.body.name,
            
          })
          await newChat.save()
          res.json(newChat)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
})
async function getChat(req, res, next){
  let chat
  try {
      chat = await Noti.findById(req.params.id)
      if (chat == null){
          return res.status(404).json({message: `Can't find user!!!`})
      }
  } catch (err) {
      return res.status(500).json({message: err.message})   
  }

  res.chat = chat
  next()
}
module.exports = chatRoute