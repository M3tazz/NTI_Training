const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("not available"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).array("Files", 5);

app.use("/uploads", express.static("uploads"));
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    /********************************/
    console.log(req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    /********************************/

    const data = req.files.map((x) => ({
      name: x.filename,
      original_name: x.originalname,
      sizeKB: Math.round(x.size / 1024),
      ext: path.extname(x.originalname),
    }));
    res.status(200).json({ message: "SUCCESS", files: data });
  });
});
app.get("/files", (req, res) => {
  const type = req.query.type ? req.query.type.toLowerCase() : null;
  if (type && type !== "pdf" && type !== "docx") {
    res.status(400).json({ error: "files only pdf and docx!" });
  }
  // filter pdfs or docxs
  fs.readdir("uploads", (err, files) => {
    if (err) {
      return res.status(404).json({ error: err.message });
    }
    const pdfs = files.filter((x) => {
      return path.extname(x) === ".pdf";
    });

    const docxs = files.filter((x) => {
      return path.extname(x) === ".docx";
    });

    if (type === "pdf") {
      return res.status(200).json(pdfs);
    }
    if (type === "docx") {
      return res.status(200).json(docxs);
    }
    return res.json(files);
  });
});

app.listen(3000, () => {
  console.log("poooort 3000 ");
});
