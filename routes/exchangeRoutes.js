const express = require("express");
const exchangeRoutes = express.Router();
const axios = require('axios');

require('dotenv').config();
const apiKey = process.env.EXCHANGE_RATE_API_KEY


exchangeRoutes.post("/", (async (req, res) => {
   
    // taking amount and currency type from request body
   let {currency,amount}=req.body

   // setting the apiKey on header

    config = {

        headers: {
            apikey: apiKey,
        },
    }

    try {
       
        // Exchange rate api 
        const response = await axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=INR&from=${currency}&amount=${amount}`,config);
        

        let INR=response.data.result;   // result in  INR

        let unitCurrency=1/(response.data.info.rate)  // value of 1 INR in given currency
        

        // Wazirx Api
       const btcRate=await axios.get('https://api.wazirx.com/sapi/v1/ticker/24hr?symbol=btcinr')
      

      let btc=btcRate.data    // btc data
    
      // converting btc data into given currency

      let openPrice=unitCurrency*(btc.openPrice)
      let HighPrice=unitCurrency*(btc.highPrice)
      let LowPrice=unitCurrency*(btc.lowPrice)
      let bidPrice=unitCurrency*(btc.bidPrice)
      let askPrice=unitCurrency*(btc.askPrice)
      let volume=btc.volume

  // setting up the final result
  
      let result={
        currency:currency,
        amount:amount,
        INR :INR,
        btc:{
        openPrice,LowPrice,HighPrice,volume,bidPrice,askPrice
        }
      }
     
        res.json(result)
       
    }
    catch (err) {
        res.json(err)
    }
   
}));

module.exports = exchangeRoutes;