const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { img: { data: Buffer, contentType: String, required: false }}, 
  aboutMe: { type: String, required: false },
  userPods: [{ type: Schema.Types.ObjectId, ref: "Pod"}],
});

const User = mongoose.model("User", userSchema);

module.exports = User;