// uplodad
var express = require("express");
var app = express();
var multer = require("multer");
var cors = require("cors");
// use cors for upload
app.use(cors());

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
// var upload = multer({ dest: "uploads/" });
var upload = multer({ storage: storage }).single("avatar");

app.post("/avatar", (req, res) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

// app.post("/avatar", upload.single("avatar"), function(req, res, next) {
//   if (err) {
//     return res.status(500).json(err);
//   }
//   return res.status(200).send(req.file);
// });

module.exports = app;
