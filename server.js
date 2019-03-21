const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/API/users");
const profil = require("./routes/API/profil");
const posts = require("./routes/API/posts");

const app = express();

// db config

const db = require("./config/key").mongoURI;

// CONNECT TO MongoDB

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello"));

// use routes
app.use("/api/users", users);
app.use("/api/profil", profil);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
