// server.js

const express = require("express");
const app = express();
const port = process.env.PORT || 3500;

// viewed at http://localhost:3500
app.get("/", function(req, res) {
    res.send("Again I Go Unnoticed");
});
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`));