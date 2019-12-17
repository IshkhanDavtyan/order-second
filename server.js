const express = require ('express')
const app = express();
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders')

app.use(express.json())
app.use(userRouter);
app.use(productRouter);
app.use(orderRouter)

require('./mongoose/mongoose');

app.listen(3000,()=>{
    console.log('Server run in port 3000')
})