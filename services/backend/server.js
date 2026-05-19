const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Backend Service Running");
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running on port 5000");
});
