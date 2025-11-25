require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payments');

const secondhandRoutes = require('./routes/secondhand');

// Add this with your other routes


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/secondhand', secondhandRoutes);


const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> app.listen(PORT, ()=> console.log(`Server running on ${PORT}`)))
.catch(err=> console.error(err));