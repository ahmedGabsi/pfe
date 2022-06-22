import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import 'dotenv/config'
import products from "./routes/products.js"
import users from "./routes/users.js"
import categories from "./routes/categories.js"
import checkout from "./routes/checkout.js"
import webhook from "./routes/webhook.js"
import payment from "./routes/payment.js";





const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); 
app.use('/products',products)
app.use('/users',users)
app.use('/categories',categories)
app.use('/checkout',checkout)
app.use('/payment',payment)

app.use('/webhook',bodyParser.raw({type: 'application/json'}),webhook)



const port = process.env.PORT;

mongoose
  .connect(process.env.CNX)
  .then(() =>
    app.listen(port, () => console.log(`Server running on port : ${port}`))
  )
  .catch((err) => console.log(err));
