var express = require('express');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var Users = require('.././model/users');
var Entries = require('.././model/entries');


var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/return_entries')
  .post(function(req, res, next) {
    if (req.body.params.user === 'null')
    {
      return
    }
    Entries.find({ user_id: req.body.params.user }).sort({start_date: -1}).lean().exec(function(err, entries) {
      if (err)
      {
        throw err
      }
      res.json({
        entries: entries,
      });

  })
});

router.route('/return_one')
  .post(function(req, res, next) {
    if (req.body.params.user === 'null')
    {
      return
    }
    Entries.findOne({ entry_id: req.body.params.entry_id }).lean().exec(function(err, entry) {
      if (err)
      {
        throw err
      }

      res.json({
        entry: entry,
      });

  })
});


router.route('/save_entry')
  .post(function(req, res, next) {

    if (req.body.params.title === null || req.body.params.title === "")
    {
      return
    }

    if (req.body.params.start_date === null || req.body.params.start_date === "")
    {
      return
    }

    var entry = new Entries();
    entry.entry_id = new ObjectId();
    entry.user_id = req.body.params.user
    entry.habit_id = req.body.params.habit_id || null
    entry.start_date = req.body.params.start_date
    entry.end_date = req.body.params.end_date
    entry.start_time = req.body.params.start_time
    entry.end_time = req.body.params.end_time
    entry.type = req.body.params.type
    entry.title = req.body.params.title
    entry.description = req.body.params.description || ""
    entry.status = "0"
    entry.multi_day = req.body.params.multi_day

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

router.route('/remove_entry')
  .post(function(req, res, next) {
    Entries.deleteOne({ entry_id: req.body.params.entry_id }).lean().exec(function(err, entries) {
      if (err)
      {
        throw err
      }

      res.json({
        success: true,
      });
    });
  })

  router.route('/update_entry')
    .post(function(req, res, next) {
      var entry_id = req.body.params.entry_id
      var type = req.body.params.type
      var start_date = req.body.params.start_date
      var end_date = req.body.params.end_date
      var start_time = req.body.params.start_time
      var end_time = req.body.params.end_time
      var title = req.body.params.title
      var status = req.body.params.status
      var multi_day = req.body.params.multi_day

      Entries.update({ entry_id: req.body.params.entry_id },
          { type: type,
            start_date: start_date,
            end_date: end_date,
            start_time: start_time,
            end_time: end_time,
            title: title,
            status: status,
            multi_day: multi_day
          }).lean().exec(function(err, docs) {
        if (err)
        {
          throw err
        }

        res.json({
          success: true,
        });
      });
    })


router.route('/update_entry_status')
  .post(function(req, res, next) {
    var new_status = null
    if (req.body.params.status === "0")
    {
      new_status = "1"
    }
    else
    {
      new_status = "0"
    }
    Entries.update({ entry_id: req.body.params.entry_id },{status: new_status}).lean().exec(function(err, docs) {
      if (err)
      {
        throw err
      }
      res.json({
        success: true,
      });
    });
  })

router.route('/update_entry_title')
  .post(function(req, res, next) {
    Entries.update({ entry_id: req.body.params.entry_id },{title: req.body.params.title}).lean().exec(function(err, docs) {
      if (err)
      {
        throw err
      }
      res.json({
        success: true,
      });
    });
  })

router.route('/update_entry_description')
  .post(function(req, res, next) {
    Entries.update({ entry_id: req.body.params.entry_id },{description: req.body.params.description}).lean().exec(function(err, docs) {
      if (err)
      {
        throw err
      }
      res.json({
        success: true,
      });
    });
  })

router.route('/update_entry_time')
  .post(function(req, res, next) {
    if (req.body.params.state === "end_time")
    {
      Entries.update({ entry_id: req.body.params.entry_id },{end_time: req.body.params.new_time}).lean().exec(function(err, docs) {
        if (err)
        {
          throw err
        }
        res.json({
          success: true,
        });
      });
    }
    else
    {
      Entries.update({ entry_id: req.body.params.entry_id },{start_time: req.body.params.new_time}).lean().exec(function(err, docs) {
        if (err)
        {
          throw err
        }
        res.json({
          success: true,
        });
      });
    }
  })

module.exports = router;
