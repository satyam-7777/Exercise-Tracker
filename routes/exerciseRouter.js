const express = require("express");

const { createUser, getUser, getAllUsers } = require("../controllers/userController");
const { addExercise } = require("../controllers/addExerciseController");
const { getExerciseLog } = require("../controllers/viewExerciseLogController");

const router = express.Router();

router.post("/users", createUser);

router.get("/users/:_id", getUser);

router.get("/users", getAllUsers);

router.post("/users/:_id/exercises", addExercise);

router.get("/users/:_id/logs", getExerciseLog);

module.exports = router;
