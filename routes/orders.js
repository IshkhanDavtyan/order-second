const express = require('express');
const router = new express.Router();
const Order = require('../models/order');
const User = require('../models/users');
const Product = require('../models/products')
const auth = require('../middleware/auth')


router.post('/order',auth, async (req, res) => {
    try {
            const userId = req.user._id
            const order = new Order({...req.body,userId});
            await order.save();
            res.send(order)
        }
     catch (e) {
        res.status(500).send(e)
    }
})


// router.post('/order/user',auth, async (req, res) => {
//     try {

//         res.send(orders)
//     } catch (e) {
//         res.status(404).send(e)
//     }
// })

//get order





module.exports = router
