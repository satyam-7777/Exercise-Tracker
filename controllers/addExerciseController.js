const User = require("../models/UserModel");
const Exercise = require("../models/ExerciseModel");

const addExercise = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const exercise = await Exercise.create({
      user: _id,
      description,
      duration: Number(duration),
      date: date ? new Date(date) : new Date(),
    });

    res.status(201).json({
      username: user.username,
      _id: user._id,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addExercise };
