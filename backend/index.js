const express = require("express");
const fs = require("fs").promises;

const app = express();
app.use(express.json());
app.use("/", express.static("../frontend/build"));

app.get("/", async (req, res) => {
  res.sendFile("../frontend/build/index.html", "utf-8");
});
app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
