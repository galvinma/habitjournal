var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/checktoken')
  .post(function(req, res, next) {
    var token = req.body.params.token
    var user = req.body.params.user

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err)
      {
        return res.json({
          allow: false,
          user: null,
          token: null,
        })
      }
      else
      {
        res.json({
            allow: true,
            user: user,
            token: token,
        });
      }
    })
  })

module.exports = router;
