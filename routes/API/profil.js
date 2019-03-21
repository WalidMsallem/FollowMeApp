const express = require("express");

const router = express.Router();

// route   GET api/profil/test
// desc     tests post route
//access   public

router.get("/test", (req, res) => res.json({ msg: "profil works" }));

module.exports = router;
