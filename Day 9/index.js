const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
mongoose.connection.on("error", (err) => {
  console.log("error is : ", err);
});
mongoose.connection.once("open", () => {
  console.log("Mongo is ready");
  app.listen(process.env.PORT, () => console.log("You are in 6000's port"));
});

// create schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    min: 1900,
    max: 2025,
  },
  genres: {
    type: [String],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});
// pre-save middleware
bookSchema.pre("save", function (next) {
  console.log(`Saving book: ${this.title}`);
  next();
});
// post-save middleware
bookSchema.post("save", function () {
  console.log(`Saved book: ${this.title}`);
});
// create instance method
bookSchema.methods.getBookInfo = function () {
  console.log(`The book ${this.title} is written by ${this.author}`);
};
// create static method
bookSchema.statics.findByGenre = function (genre) {
  return this.find({ genres: genre });
};
// create model
const NewBook = mongoose.model("book", bookSchema);

(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("connected");
    const book1 = new NewBook({
      title: "book one",
      author: "Moataz",
      publishedYear: 2000,
      genres: ["logic", "elec"],
      isAvailable: true,
    });
    await book1.save();
    // Root
    app.get("/", (req, res) => {
      res.send("Welcome Mongoose!");
    });
    // Route 1
    app.post("/books", async (req, res) => {
      // console.log(req.body);
      try {
        const book = new NewBook(req.body);
        const savedBook = await book.save();
        res.status(201).json(savedBook);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
    // Route 2
    app.get("/books", async (req, res) => {
      const e = await NewBook.find();
      res.status(200).json(e);
    });
    // Route 3
    app.get("/books/:id", async (req, res) => {
      try {
        const x = await NewBook.findById(req.params.id);
        if (x) res.status(200).json(x);
        else return res.status(400).send("Book not found");
      } catch (err) {
        res.status(400).send("invalid book id!");
      }
    });
    // Route 4
    app.put("/books/:id", async (req, res) => {
      try {
        const x = await NewBook.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        if (!x) res.status(404).send("Book doesn'\t exist");
        res.json(x);
      } catch (error) {
        res.status(400).json({ message: "invalid book id" });
      }
    });
    // Route 5
    app.delete("/books/:id", async (req, res) => {
      try {
        const deletedBook = await NewBook.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
          res.status(404).json({ message: "Book not found!" });
        }
        res.status(200).json({ message: "Deletion confirmed!" });
      } catch (error) {
        res.json({ error });
      }
    });
    // Route find books by genre
    app.get("/books/genres/:genre", async (req, res) => {
      try {
        const myGenre = await NewBook.findByGenre(req.params.genre);
        if (myGenre.length === 0) {
          res.status(404).json({ message: "Book not found!" });
        }
        res.status(200).json({ message: "success!", book: myGenre });
      } catch (error) {
        console.log("error : ", error);
      }
    });
    // catch
  } catch (err) {
    console.log("error : ", err);
  }
})();
