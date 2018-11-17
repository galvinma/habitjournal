var express = require('express');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var Users = require('.././model/users');
var Habits = require('.././model/habits');
var Entries = require('.././model/entries');


var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/return_habit_names')
  .post(function(req, res, next) {
    if (req.body.params.user === 'null')
    {
      return
    }
    Habits.find({ user_id: req.body.params.user }).sort({start_date: -1}).lean().exec(function(err, habits) {
      if (err)
      {
        throw err
      }
      res.json({
        habits: habits,
      });
  })
});

router.route('/save_habit')
.post(function(req, res, next) {
  var new_habit = new Habits();
  new_habit.habit_id = new ObjectId();
  new_habit.user_id = req.body.params.user
  new_habit.title = req.body.params.title
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

router.route('/remove_habit')
  .post(function(req, res, next) {
    Habits.deleteOne({ habit_id: req.body.params.habit_id }).lean().exec(function(err, habit) {
      if (err)
      {
        throw err
      }
    })

    Entries.deleteMany({ habit_id: req.body.params.habit_id }).lean().exec(function(err, habit) {
      if (err)
      {
        throw err
      }
    });

    res.json({
      success: true,
    });
  })

router.route('/update_habit')
  .post(function(req, res, next) {
    Habits.update({ habit_id: req.body.params.habit_id },{title: req.body.params.new_title}).lean().exec(function(err, docs) {
      if (err)
      {
        throw err
      }
    });

    Entries.update({ habit_id: req.body.params.habit_id },{title: req.body.params.new_title},{multi:true}).lean().exec(function(err, docs) {
      if (err)
      {
        throw err
      }
    });

    res.json({
      success: true,
    });
  })

router.route('/log_habit')
.post(function(req, res, next) {
  // check if habit exists
  Entries.find({ user_id: req.body.params.user,  habit_id: req.body.params.habit_id, start_date: req.body.params.start_date}).lean().exec(function(err, habits) {
    if (err)
    {
      throw err
    }

    if (habits.length > 0)
    {
      if (habits[0].status === "0")
      {
        new_status = "1"
      }
      else
      {
        new_status = "0"
      }

      Entries.update({ entry_id: habits[0].entry_id },{status: new_status}).lean().exec(function(err, docs) {
        if (err)
        {
          throw err
        }
        res.json({
          success: true,
        });
      })
    }
    else // create habit entry
    {
      Habits.find({ user_id: req.body.params.user,  habit_id: req.body.params.habit_id}).lean().exec(function(err, title) {
        if (err)
        {
          throw err
        }
        var entry = new Entries();
        entry.entry_id = new ObjectId();
        entry.user_id = req.body.params.user
        entry.habit_id = req.body.params.habit_id || null
        entry.start_date = req.body.params.start_date
        entry.end_date = req.body.params.end_date
        entry.start_time = req.body.params.start_time
        entry.end_time = req.body.params.end_time
        entry.multi_day = req.body.params.multi_day
        entry.type = req.body.params.type
        entry.title = title[0].title
        entry.description = title[0].description
        entry.status = "1"

        entry.save(function(err) {
            if (err)
            {
              throw err
            }
            res.json({
              success: true,
            });
        });
      })
    }
  })
})

module.exports = router;
