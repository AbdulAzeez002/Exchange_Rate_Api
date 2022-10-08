const express=require('express');
const exchangeRoutes = require('./routes/exchangeRoutes');
const app=express()
const dotenv=require('dotenv')

app.use(express.json())
 
app.use("/api/exchange", exchangeRoutes);

app.listen(5000,console.log('server running on port 5000'))


