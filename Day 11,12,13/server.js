const app = require("./app");
const connectDB = require("./config/db");

require("dotenv").config();
connectDB();

app.listen(process.env.PORT, () => {
  console.log("you are in port 3000");
});
