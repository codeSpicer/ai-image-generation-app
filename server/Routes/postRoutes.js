import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongoDB/models/post.js";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();

// GET ALL POSTS
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ sucess: true, data: posts });
  } catch (error) {
    res.status(500).json({ sucess: false, message: error });
  }
});

// CREATE A POST
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoURL = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({ name, prompt, photo: photoURL.url });
    res.status(201).json({ sucess: true, data: newPost });
  } catch {
    res.status(501).json({ sucess: false, message: error });
  }
});

export default router;
