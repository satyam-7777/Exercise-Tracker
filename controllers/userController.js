const User = require("../models/UserModel");

const createUser = async (req, res, next) => {
  try {
    const { username } = req.body;

    const user = await User.create({
      username,
    });

    res.status(201).json({
      username: user.username,
      _id: user._id,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      username: user.username,
      _id: user._id,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    const result = users.map((user) => ({
      username: user.username,
      _id: user._id,
    }));

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, getUser, getAllUsers };
