const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

let refreshTokens = [];

router.post("/refresh", async (req, res) => {
  // Get the refresh token from request body and check whether there is refresh token or not
  const refreshToken = req.body.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token provided" });
  // Check whether there is refresh token inside refresh tokens array or not .
  // Because If user logins or registers refreshTokens array must include refreshToken
  if (!refreshTokens.includes(refreshToken))
    return res
      .status(401)
      .json({ message: "No refreshTokens include refreshToken" });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({ message: "Refresh token is no valid" });
    const payload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };
    // Generate new access token and new refresh token
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET);

    // Remove previous refresh token from refreshTokens array
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    refreshTokens.push(newRefreshToken);

    return res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  });
});

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const newUser = new User({
    email,
    password,
    name: `${firstName} ${lastName}`,
  });
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(400).send("Email must be unique , User already exists");

    const savedUser = await newUser.save();

    const payload = {
      name: savedUser.name,
      email: savedUser.email,
      id: savedUser._id,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET);

    refreshTokens.push(refreshToken);

    const { password, ...others } = savedUser._doc;
    req.headers["authorization"] = `Bearer ${accessToken}`;
    res.status(200).json({ ...others, accessToken, refreshToken });
  } catch (err) {
    res.status(400).send("Error while registering user");
  }
});

router.post("/logout", (req, res) => {
  refreshTokens = [];
  res.status(200).json(refreshTokens);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (!user) return res.status(400).send("No user with given email");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json({ message: "No user with given password", err });
    }
    const payload = {
      name: user.name,
      email: user.email,
      id: user._id,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET);

    refreshTokens.push(refreshToken);

    const { password, ...others } = user._doc;
    req.headers["authorization"] = `Bearer ${accessToken}`;
    res.status(200).json({ ...others, accessToken, refreshToken });
  } catch (err) {
    res
      .status(403)
      .send("No user with given email or password , please try again");
  }
});

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "10s" });
}

module.exports = router;
