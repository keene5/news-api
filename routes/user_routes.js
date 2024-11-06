const express = require("express");
const validator = require("validator");

const userRouter = express.Router();
const User = require("../model/user.js");
const { v4: uuidv4 } = require("uuid");

const { models } = require("mongoose");
module.exports = userRouter;

userRouter.post('/createUser', async (req, res, next) => {
  const { user, password } = req.body;

  // Validate the incoming request
  if (!password || !user ) {
    return res.status(400).json({ message: 'password and access level userId are required.' });
  }

  try {
    const existingUser = await User.findOne({ user });
    if (existingUser) {
      return res.status(200).json({  message: 'User ID already exists' });
    }

    // Create a new user with the generated API key
    const userObj = new User({
      user,
      password,
    });

    // Save the user to the database
    const savedUser = await userObj.save();

    // Return the API key to the user
    res.status(201).json({ message: 'New user created' });
  } catch (error) {
    console.error('Error during user creation:', error);
    next(error); // Pass errors to the error handling middleware
  }
});

userRouter.post('/authenticate', async (req, res, next) => {
  const { user, password } = req.body;

  // Validate the incoming request
  if (!password || !user) {
    return res.status(400).json({ message: 'password and access level userId are required.' });
  }

  try {
    const existingUser = await User.findOne({ user});
    if(existingUser && existingUser.password === password) {
      return res.status(200).json({  message: 'User ID is Valid' });
    }
    else if(existingUser && !existingUser.password === password) {
      return res.status(401).json({  message: 'User ID is not authorized' });
    }
    else{
      return res.status(403).json({  message: 'User does not found' });
    }
  } catch (error) {
    console.error('Error during user creation:', error);
    next(error); // Pass errors to the error handling middleware
  }
});

userRouter.delete("/deleteAllUsers", async (req, res, next) => {
  try {
    // Delete all documents from the User collection
    const result = await User.deleteMany({});

    // Send a response with the count of deleted documents
    res.status(200).json({ message: "All users deleted successfully", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error during deletion of all users:", error);
    next(error); // Pass errors to the error handling middleware
  }
});

// Error handling middleware
userRouter.use((err, req, res, next) => {
  console.error('Error:', err);

  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Invalid data type provided.' });
  }

  res.status(500).json({ message: 'Internal server error.' });
});

userRouter.get("/getAllUsers",  async (req, res) => {
  try {
    const data = await User.find();
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = userRouter;