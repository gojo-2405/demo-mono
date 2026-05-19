const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Payment Service Running");
});

app.listen(5002, "0.0.0.0", () => {
  console.log("Payment running on port 5002");
});
