const jwt = require('jsonwebtoken');
const User = require('../models/users');

const  auth =async (req,res,next)=> {
    try{
    const token = req.headers.authorization.replace("Bearer ","");
    const verify = jwt.verify(token,'secret');
    const user = await User.findById(verify._id.toString());

    req.user = user;
    req.token = token;

    next()
}catch(e){
    throw new Error({error:"please auth"})
}}

module.exports = auth;