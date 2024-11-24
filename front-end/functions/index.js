const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express= require("express")
const cors= require("cors")
const dotenv= require("dotenv");
const { setGlobalOptions } = require("firebase-functions/v2");
dotenv.config();
const stripe = require("stripe")(process.env.VITE_FIREBASE_STRIPE_KEY);

const app= express();

setGlobalOptions({
    maxInstances: 10,
}) // maxInstances: 10, 10 instances of the function can run at the same time, this needed after our functions is deployed

app.use(cors({origin:true}));

app.get("/", (req, res) =>{
    res.status(200).json({
        message:"Hello World!",
    });
})


app.post("/payment/create", async(req,res) => {
    const total= parseInt(req.query.total);

    if(total > 0){
        const paymentIntent= await stripe.paymentIntents.create({
            amount: total,
            currency: "usd"
        })
        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        })
    }else{
        res.status(403).json({
            message:"total must be greater than zero"
        })
    }
})

exports.api = onRequest(app);