let express = require("express");
let router = express.Router();
let ImageSchema = require("../../models/image");
const { ObjectID } = require("mongodb");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function(req, file, cb) {
    cb(null, Math.floor(Math.random() * 100) + file.originalname);
    // console.log("reqqqq ", req);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 9999999999999999999999999999 }
}).single("postImage");

router.post("/post/img", function(req, res) {
  upload(req, res, err => {
    // console.log("Request ---", req.body);
    // console.log("Request file ---", req.file.filename); //Here you get file.
    // /*Now do where ever you want to do*/
    // console.log("Request ---", req.file.filename);

    if (err) return res.status(500).send(err);
    else {
      return res.status(200).send(req.file.filename);
    }
  });
});

router.post("/post/:id", (req, res) => {
  // console.log(req.body);
  let index = ObjectID(req.params.id);
  Post.findOne({ _id: index }).then(img => {
    img.image.push(req.body.image);

    img
      .save()
      .then(img => res.json(img))
      .catch(err => console.log(err));
    console.log(profisssssssssssssle);
    // console.log(img.image);
    // console.log(req.body.image);
  });
});

module.exports = router;
