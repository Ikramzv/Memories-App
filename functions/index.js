require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const { onRequest } = require("firebase-functions/v1/https");

app.use(cors({origin: true}))
app.use((req,res,next) => {
  res.set('Access-Control-Allow-Origin' , '*')
  res.set('Access-Control-Allow-Headers' , 'Content-type')
  next()
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ROUTES
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
//

app.get("/", (req, res) => {
  res.send("Server is running");
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MONGODB connected");
}).catch((err) => console.log(err));

exports.api = onRequest(app)
