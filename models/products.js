const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category:{
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    gin:{
        type:Number,
        required:true
    }
})

// productSchema.virtual('prodorders',{
//     ref:'Order',
//     localField:'productId',
//     foreignField:'_id'
// })

const Product = mongoose.model('Product',productSchema);

module.exports = Product