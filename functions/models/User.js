const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    const hashed = await bcrypt.hash(user.password, 12);
    this.password = hashed;
    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = mongoose.model("user", userSchema);
