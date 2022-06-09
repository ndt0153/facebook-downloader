const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PageSchema = new Schema({
  id: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  text: { type: String },
  img: { type: String, required: true },
});
module.exports = mongoose.model("Page", PageSchema);
