var express = require('express');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var Users = require('.././model/users');
var Bullets = require('.././model/bullets');


var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/return_bullets')
  .post(function(req, res, next) {

    if (req.body.params.user === 'null')
    {
      return
    }

    Bullets.find({ user_id: req.body.params.user }).sort({date: -1}).lean().exec(function(err, bullets) {
      if (err)
      {
        throw err
      }
      res.json({
        bullets: bullets,
      });

  })
});

router.route('/save_bullet')
  .post(function(req, res, next) {
    var new_bullet = new Bullets();
    new_bullet.bullet_id = new ObjectId();
    new_bullet.user_id = req.body.params.user
    new_bullet.date = req.body.params.date
    new_bullet.type = req.body.params.type
    new_bullet.description = req.body.params.description
    new_bullet.status = "0"

    new_bullet.save(function(err) {
        if (err)
        {
          throw err
        }

        res.json({
          success: true,
        });

    });
  })

router.route('/remove_bullet')
  .post(function(req, res, next) {
    Bullets.deleteOne({ bullet_id: req.body.params.bullet_id }).lean().exec(function(err, bullets) {
      if (err)
      {
        throw err
      }

      res.json({
        success: true,
      });

    });
  })

router.route('/update_bullet_status')
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

    Bullets.update({ bullet_id: req.body.params.bullet_id },{status: new_status}).lean().exec(function(err, docs) {
      if (err)
      {
        throw err
      }
      res.json({
        success: true,
      });


    });
  })

router.route('/update_bullet_description')
  .post(function(req, res, next) {

    Bullets.update({ bullet_id: req.body.params.bullet_id },{description: req.body.params.description}).lean().exec(function(err, docs) {
      if (err)
      {
        throw err
      }
      res.json({
        success: true,
      });
    });
  })

module.exports = router;
