const express = require("express");
const mongoose = require("mongoose");
const PostMessage = require("../models/postMessage");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments();
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (err) {
    res.status(400).send("Error while getting post message");
  }
});

router.get("/find/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await PostMessage.findById(postId);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).send("Error while fetching single post");
  }
});

router.get("/search", async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [
        {
          title,
        },
        {
          tags: {
            $in: tags.split(","),
          },
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).send("Error while getting posts by search");
  }
});

router.post("/", auth, async (req, res) => {
  if (!req.userId) return res.status(403).json({ message: "Unauthenticated" });
  const newPost = new PostMessage({
    ...req.body,
    creator: req.userId,
    createdAt: new Date().toLocaleString(),
  });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(400).send("Error while creating post message");
  }
});

router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!req.userId) return res.status(403).json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.status(403).json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with given id");
  try {
    await PostMessage.findByIdAndDelete(id);
    res.status(200).send("Post have successfully deleted");
  } catch (err) {
    res.status(404).send("Error while deleting post");
  }
});

router.patch("/:id/likePost", auth, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with given id");

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== req.userId);
  }
  if (!req.userId) return res.status(403).json({ message: "Unauthenticated" });
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
});

router.post("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with given id");
    const post = await PostMessage.findById(id);
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).send("Error while commenting to the post");
  }
});

module.exports = router;
