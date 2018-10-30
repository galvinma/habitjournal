var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Users = require('.././model/users');
var generateJWT = require('.././jwt');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/login')
  .post(function(req, res, next) {
      Users.findOne({ email: req.body.params.email }).lean().exec(function(err, docs) {
        if (err)
        {
          console.log(err)
        }
        else
        {
          bcrypt.compare(req.body.params.password, docs.password, function(err, response) {
            if (err)
            {
              console.log(err)
            }
            else
            {
              // create token
              var login_user = new Users();
              login_user.id = docs.id
              login_user.email = docs.email;

              var token = generateJWT.generateJWT(login_user)
              res.json({
                  allow: response,
                  user: login_user.id,
                  token: token,
              });
            }
          });
        }
      });
  });

module.exports = router;
