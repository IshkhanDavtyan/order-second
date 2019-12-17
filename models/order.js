const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId

    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
})

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;