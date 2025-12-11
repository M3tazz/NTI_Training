const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
mongoose.connection.on("error", (err) => {
  console.log(err);
});
mongoose.connection.once("open", () => {
  console.log("<-----------------Mongo is ready!----------------->");
  app.listen(process.env.PORT, () =>
    console.log("your port ", process.env.PORT)
  );
});
// user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
});
// user model
const User = mongoose.model("User", userSchema);

// post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
// post model
const Post = mongoose.model("Post", postSchema);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("<-----------connected----------->");
    // Route 1
    app.post("/users", async (req, res) => {
      try {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
        });
        let x = await newUser.save();
        res.status(200).json({
          message: "<-----------User added!----------->",
          MyNewUser: x,
        });
      } catch (error) {
        res.status(404).json({ error: error });
      }
    });
    // Route 2
    app.post("/posts", async (req, res) => {
      try {
        const myUser = await User.findById(req.body.author);
        // console.log(myUser);

        if (!myUser) {
          res.status(404).json({ error: "user not found" });
        }
        const newPost = new Post({
          title: req.body.title,
          content: req.body.content,
          author: myUser,
        });
        let x = await newPost.save();
        res.status(200).json({
          message: "<-----------Post added!----------->",
          MyNewPost: x,
        });
      } catch (err) {
        res.status(400).json({ error: err });
      }
    });
    // Route 3
    app.get("/posts", async (req, res) => {
      try {
        const x = await Post.find().populate({
          path: "author",
          select: "name",
        });
        res.status(200).json(x);
      } catch (error) {
        res.status(400).json({ error });
      }
    });
    // Route 4 get all post with .lean() if lean == true
    app.get("/posts", async (req, res) => {
      try {
        if (req.query.lean === "true") {
          const x = await Post.find()
            .populate({
              path: "author",
              select: "name",
            })
            .lean();
          res.status(200).json(x);
        } else {
          res.json({ lean: false });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
    });
    // Route 5 /posts/export
    app.get("/posts/export", async (req, res) => {
      try {
        const posts = await Post.find().populate("author");
        const writeStream = fs.createWriteStream("posts.txt", "utf8");
        posts.map((x) => {
          writeStream.write(
            `Title: ${x.title} , Author: ${x.author.name} \n\n\n\n\n`
          );
        });
        writeStream.end();
        writeStream.on("finish", () => {
          res.json({ message: "Export finished!" });
        });
        writeStream.on("error", (err) => res.status(400).json({ error: err }));
      } catch (error) {
        res.status(400).json({ error: err });
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
})();
