const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* img Schema for sotiring imges in the mongodb database */

var ImageSchema = new mongoose.Schema({
  image: { type: String, required: true, minlength: 1 }
});

module.exports = mongoose.model("image", ImageSchema);
