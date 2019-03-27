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
}).single("myImage");

router.post("/up", function(req, res) {
  upload(req, res, err => {
    // console.log("Request ---", req.body);
    // console.log("Request file ---", req.file); //Here you get file.
    // /*Now do where ever you want to do*/
    // console.log("Request ---", req.body.name);

    if (err) return res.status(500).send(err);
    else {
      return res.status(200).send(req.file.filename);
    }
  });
});

router.get("/g", (req, res) => {
  image
    .find()
    .then(src => {
      res.json({ src });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/uplo", function(req, res) {
  upload(req, res, err => {
    console.log("Request ---", req.body);
    console.log("Request file ---", req.file); //Here you get file.
    /*Now do where ever you want to do*/
    console.log("Request ---", req.body.name);

    if (err) return res.status(500).send(err);
  });
  let img = new ImageSchema(
    {
      image: req.body.image
    },
    { _id: false }
  );
  img
    .save()
    .then(doc => {
      console.log(doc);
      res.send(doc);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

// router.put("/", function(req, res) {
//   let id = req.body._id;
//   let pr = new product({
//     _id: req.body._id,
//     name: req.body.name,
//     image: req.body.image,
//     description: req.body.description,
//     category: req.body.category,
//     price: req.body.price,
//     quantity: req.body.quantity,
//     package: req.body.package,
//     bestSeller: req.body.bestSeller
//   });
//   product
//     .findByIdAndUpdate(id, pr, { new: true })
//     .then(function(user) {
//       res.send(pr);
//     })
//     .catch(e => {
//       res.status(400).send(e);
//     });
// });

// router.delete("/:id", (req, res) => {
//   let id = req.params.id;
//   product
//     .findByIdAndRemove(id)
//     .then(products => {
//       res.send({ products });
//       return res.status(200).send();
//     })
//     .catch(e => {
//       res.status(400).send(e);
//     });
// });
// router.get("/:id", (req, res) => {
//   let id = req.params.id;
//   product
//     .findOne({ _id: id })
//     .then(products => {
//       res.send({ products });
//       return res.status(200).send();
//     })
//     .catch(e => {
//       res.status(400).send(e);
//     });
// });

// update quantity
// router.put("/quantity/:id", function(req, res) {
//   let id = req.params.id;
//   product
//     .findById(id)
//     .then(function(p) {
//       let newProduct = {
//         ...p._doc,
//         quantity: p._doc.quantity - req.body.quantity
//       };
//       if (newProduct.quantity >= 0 && p.quantity !== 0) {
//         product
//           .findByIdAndUpdate(id, newProduct, { new: true })
//           .then(function() {
//             res.send(newProduct);
//           })
//           .catch(e => {
//             res.status(400).send(e);
//           });
//       } else {
//         res.send({
//           message: `${newProduct.name} ${
//             p.quantity === 0 ? "is out of stock" : `still only ${p.quantity}`
//           }`
//         });
//       }
//     })
//     .catch(e => {
//       res.status(400).send(e);
//     });
// });

module.exports = router;

router.post("/avatar/:id", (req, res) => {
  let index = ObjectID(req.params.id);
  User.findOne({ _id: index }).then(user => {
    user.avatar = req.body.image;

    user
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));

    console.log(user);
  });
});
