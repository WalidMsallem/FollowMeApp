const express = require("express");

const router = express.Router();

// route   GET api/users/test
// desc     tests post route
//access   public

router.get("/test", (req, res) => res.json({ msg: "useres works" }));

module.exports = router;
