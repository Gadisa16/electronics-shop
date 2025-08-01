const express= require("express")
const cors= require("cors")
const dotenv= require("dotenv")
dotenv.config();
const stripe = require("stripe")(process.env.VITE_FIREBASE_STRIPE_KEY);

const app= express();
app.use(cors({origin:true}));

app.get("/", (req, res) =>{
    res.status(200).json({
        message:"Hello World!",
    });
})


app.post("/payment/create", async(req, res) => {
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

app.listen(3333, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running on port: 3333`);
    console.log(`Visit https://localhost:3333`);
});

// baseUrl: "http://127.0.0.1:5001/clone2-f66f1/us-central1/api"
