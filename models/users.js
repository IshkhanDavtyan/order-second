const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validate = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Password can not contain 'password'")
            }
        }
    },
    
    pasportnumber:{
        type:String,
        required:true
    },

    tokens:[{
        token:{
            type:String
        }
    }]
});

userSchema.virtual('orders',{
    ref:'Order',
    localField:'_id',
    foreignField:'userId'
})

userSchema.methods.addToken = async function () {

    const user = this;
    const token =await jwt.sign({_id:user._id.toString()},'secret');
    user.tokens = user.tokens.concat({token});
    await user.save();
    console.log(token)
    return token
}

userSchema.statics.findUserByLoginPassword = async (name,password)=>{
    const user = await User.findOne({name});
    if(!user){
        throw new Error("There is no user")
    }

    if(user.password !== password){
        throw new Error("Incorect password")
    }
    return user
}

userSchema.pre('save',async function (next) {
    const user = this
    if(user.isModified('password')){
        user.password =await bcrypt.hash(user.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema);

module.exports = User
