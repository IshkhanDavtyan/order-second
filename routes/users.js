const express = require('express');
const router = new express.Router();
const User = require('../models/users');
const Product = require('../models/products');
const auth = require('../middleware/auth')


router.post('/users', async (req, res) => {
    console.log(req.body)
    const user = new User(req.body);
        await user.save();
        res.send(user)
    try {
        
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.post('/login', async (req, res) => {

    const user = await User.findUserByLoginPassword(req.body.name, req.body.password)
    console.log(user)
    const token = user.addToken();
    try {
        res.send({ user, token })
    } catch (e) {
        res.status(404).send(e)
    }
})

//get user's orders

router.get('/user/me', auth, async (req, res) => {
    try {
        await req.user.populate('orders').execPopulate();
        res.send(req.user.orders)
    } catch (e) {
        res.status(404)
    }
})

router.delete('/logout', auth, async (req, res) => {
    try {
       req.user.tokens= req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
       await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})
// router.patch('createProduct', async (req,res)=>{
//     try{
//         const user =await User.findById(req.body.userid);
//         //5df75dfa716077336815c333
//         const product = await Product.findById(req.body.productId);
//         //5df75e5ad7e5a001dcfc956f
//         user.products = user.products.concat(product.name)
//         await user.save();
//         res.send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

module.exports = router