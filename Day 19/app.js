const express = require("express");
const app = express();
const swagger = require("swagger-ui-express");
const userRoutes = require("./routes/user.route");
const booksRoutes = require("./routes/books.route");
const yaml = require("js-yaml");

const fs = require("fs");
const path = require("path");
// const spec = yaml.load(fs.readFileSync(path.join("./openapi.yaml"), "utf8"));
const spec = yaml.load(fs.readFileSync(path.join("./openapi.yaml"), "utf8"));

app.use(express.json());
app.use(userRoutes);
app.use("/api-docs", swagger.serve, swagger.setup(spec));

module.exports = app;
