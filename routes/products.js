const express = require('express');
const router = new express.Router();
const Product = require('../models/products');

router.post('/products',async (req,res)=>{
    console.log(req.body)
    try{
        const product = new Product(req.body);
        await product.save();
        res.send(product)
    }catch(e){
        res.status(500).send(e)
    }
})

//get all products

router.get('/products',async (req,res)=>{
    try{
        const products =await Product.find({});
        res.send(products)
    }catch(e){  
        res.status(404).send(e)
    }
})

//get products by categories

router.get('/products/:category',async (req,res)=>{
    try{
        const products = await Product.find({category:req.params.category})
        res.send(products)
    }   
    catch(e){
        res.status(404).send(e)
    }
})

//get product's count

// router.get('/product/:any',async(req,res)=>{
//     console.log(req.params)

//     const product = await Product.findOne({_id:req.params.any})
//     await product.populate('prodorders').execPopulate();
//     res.send(product.prodorders)

//     try{
       
//     }catch(e){
//         res.status(500).send(e)
//     }
// })



module.exports = router
