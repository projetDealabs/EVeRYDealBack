const mongoose = require("mongoose");

const comment_schema = new mongoose.Schema({
  content: {
    type: String,
    require: "Content is Required"
  },
  djadja : Number,
  deal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "model",
    required: "model is Required Field"
  }
});

module.exports = mongoose.model("Comment", comment_schema);