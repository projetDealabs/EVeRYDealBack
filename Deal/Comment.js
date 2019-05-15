const mongoose = require("mongoose");

const comment_schema = new mongoose.Schema({
  content: String,
    
  deal:  mongoose.Schema.Types.ObjectId,
  
});

module.exports = mongoose.model("Comment", comment_schema);