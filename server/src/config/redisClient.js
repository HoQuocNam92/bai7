const { createClient } = require("@redis/client");
const client = createClient({
  url: "redis://localhost:6379",
});

client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => console.error("Error connecting to Redis:", err));

module.exports = client;
