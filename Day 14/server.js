const app = require("./app");
const connectDB = require("./config/db");
connectDB();
app.listen(3000, () => {
  console.log("you are in port 3000");
});
