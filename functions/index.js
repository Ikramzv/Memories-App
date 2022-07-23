require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
app.use(cors())
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "https://memories-app-b0e8f.web.app");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

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

exports.app = functions.https.onRequest(app);
