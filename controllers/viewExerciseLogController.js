const User = require("../models/UserModel");
const Exercise = require("../models/ExerciseModel");

const getExerciseLog = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const filter = {
      user: _id,
    };

    if (from || to) {
      filter.date = {};

      if (from) {
        filter.date.$gte = new Date(`${from}T00:00:00.000Z`);
      }

      if (to) {
        filter.date.$lte = new Date(`${to}T23:59:59.999Z`);
      }
    }

    let query = Exercise.find(filter).sort({ date: 1 });

    if (limit) {
      query = query.limit(Number(limit));
    }

    const exercises = await query;

    const exerciseLogs = exercises.map((exercise) => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
    }));

    res.status(200).json({
      username: user.username,
      count: exerciseLogs.length,
      _id: user._id,
      log: exerciseLogs,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getExerciseLog };
