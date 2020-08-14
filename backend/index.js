const express = require("express");
const fs = require("fs").promises;
const apiRoute = require('./routes/api')
const mongoose = require("mongoose");
const path = require('path');

const app = express();
app.use(express.json());
app.use("/", express.static("../frontend/build"));
app.use('/api', apiRoute);


//main routes
app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"), "utf-8");
});



mongoose.connect("mongodb+srv://testboy:testboy@rest.tmyts.mongodb.net/Garuda?retryWrites=true&w=majority", 
{ useUnifiedTopology: true , useNewUrlParser: true }, ()=>{
  console.log("Connected to DB");
})


app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
