const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Auth Service Running");
});

app.listen(5001, "0.0.0.0", () => {
  console.log("Auth running on port 5001");
});
