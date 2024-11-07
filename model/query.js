const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const querySchema = new mongoose.Schema(
  {
    queryId: {
      type: String,
      unique: true,
      default: uuidv4, // Automatically generate a unique ID
      required: true,
    },
    queryName: {
      required: true,
      type: String,
    },
    q: {
      required: true,
      type: String,
    },
    language: {
      required: true,
      type: String,
    },
    pageSize: {
      required: true,
      type: Number,
    },
  });
  module.exports = mongoose.model('Query', querySchema, 'queries');
