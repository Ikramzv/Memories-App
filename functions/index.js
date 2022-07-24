require("dotenv").config();
const functions = require("firebase-functions");
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

app.use(cors())

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

exports.api = functions.https.onRequest(app);
