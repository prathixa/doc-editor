const { Schema, model } = require("mongoose")

// This defines the structure of your saved document in MongoDB
const Document = new Schema({
  _id: String,
  data: Object,
})

module.exports = model("Document", Document)