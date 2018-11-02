var express = require('express');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var Users = require('.././model/users');
var Habits = require('.././model/habits');


var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/return_habits')
  .post(function(req, res, next) {

    if (req.body.params.user === 'null')
    {
      return
    }

    Habits.find({ user_id: req.body.params.user }).sort({date: -1}).lean().exec(function(err, habits) {
      if (err)
      {
        throw err
      }
      res.json({
        habits: habits,
      });

  })
});

router.route('/create_habit')
.post(function(req, res, next) {
  var new_habit = new Habits();
  new_habit.habit_id = new ObjectId();
  new_habit.user_id = req.body.params.user
  new_habit.name = req.body.params.name
  new_habit.status = "0"

  new_habit.save(function(err) {
      if (err)
      {
        throw err
      }

      res.json({
        success: true,
      });

  });
});


module.exports = router;
