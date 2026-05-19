const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Notification Service Running");
});

app.listen(5003, "0.0.0.0", () => {
  console.log("Notification running on port 5003");
});
