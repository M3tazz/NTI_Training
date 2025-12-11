const express = require("express");
const app = express();
const logger = require("./logger");
const mogran = require("morgan");
const redis = require("redis");
app.use(mogran("dev"));
const client = redis.createClient();
client
  .connect()
  .then(() => logger.info("✅ Redis connected"))
  .catch((err) => logger.error(err));

// morgan
app.get("/photos", async (req, res) => {
  try {
    const cachedData = await client.get("photos");
    if (cachedData) {
      return res.json({ Photos: JSON.parse(cachedData) });
    }
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await response.json();
    await client.set("photos", JSON.stringify(data), {
      EX: 30,
    });
    res.json({ Photos: data });
  } catch (err) {
    logger.error(err);
  }
});

app.listen(3000, () => {
  console.log("server connect 3000");
});
