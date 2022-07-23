const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleString(),
  },
})

const PostMessage = mongoose.model("PostMessage", postSchema)

module.exports = PostMessage;
