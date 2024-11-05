const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const dataSchema = new mongoose.Schema(
  {
    queryId: {
      type: String,
      unique: true,
      default: uuidv4, // Automatically generate a unique ID
      required: true,
    },
    name: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
  },
  { collection: process.env.QUERY_COLLECTION}
);

module.exports = mongoose.model("Query", dataSchema);