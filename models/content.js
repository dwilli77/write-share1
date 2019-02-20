const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
  contentText: { type: String, required: false },
  contentCreator: { type: String, required: true},
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;