const express = require("express");
const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "../queries.json");
const router = express.Router();
const QueryModel = require("../model/query.js");
const { v4: uuidv4 } = require("uuid");
const { models } = require("mongoose");
module.exports = router;

router.post("/addQuery", async (req, res) => {
  const data = new QueryModel({
    queryName: req.body.queryName,
    q: req.body.q,
    language: req.body.language,
    pageSize: req.body.pageSize,
  });
  try {
    const dataToSave = await data.save();
    if (!data.queryName) {
      return res.status(400)
        .send({ error: "Query must have a name and timestamp" });
    }
    const jsonQueries = getAllQueriesFromFile();
    jsonQueries.push(JSON.stringify(data));
    writeQueriesToFile(jsonQueries);
    res.status(201).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete("/deleteAllQueries", async (req, res, next) => {
  try {
    // Delete all documents from the User collection
    const result = await QueryModel.deleteMany({});

    // Send a response with the count of deleted documents
    res.status(200).json({ message: "All queries deleted successfully", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error during deletion of all queries:", error);
    next(error); // Pass errors to the error handling middleware
  }
});


router.get("/getAllQueries", async (req, res) => {
  try {
    const data = await QueryModel.find().select("-_id");
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getQueriesFromFile", async (req, res) => {
  try {
    const jsonQueries = getAllQueriesFromFile().map(query => JSON.parse(query));
    res.status(200).json(jsonQueries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function getAllQueriesFromFile() {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return [];
  }
}


function getAllQueriesFromFile() {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return [];
  }
}

function writeQueriesToFile(queries){
  try {
    fs.writeFileSync(filePath, JSON.stringify(queries, null, 2));
  } catch (error) {
    console.error("Error writing to JSON file:", error);
  }
}
module.exports = router;

