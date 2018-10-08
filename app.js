var express = require('express');
var cors = require('cors')
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

// mongodb
var Users = require('./model/users');
var Events = require('./model/users');

// functions
var generateJWT = require('./jwt');

var app = express();
app.use(cors());
cors({credentials: true, origin: true})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1/database', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var router = express.Router();

router.use(function(req, res, next) {
    next();
});

app.route('/api/signup')
    .post(function(req, res, next) {
        console.log("in signup")
        var signup_user = new Users();
        signup_user.id = new ObjectId();
        signup_user.firstname = req.body.params.firstname;
        signup_user.lastname = req.body.params.lastname;
        signup_user.email = req.body.params.email;
        signup_user.password = req.body.params.password;

        signup_user.save(function(err) {
            if (err)
            {
              console.log(err)
            }
            else
            {
              console.log("creating token")
              // create token
              var token = generateJWT.generateJWT(signup_user)
              res.json({
                allow: true,
                user: signup_user.id,
                token: token,
              });
            }
        });
    });

app.route('/api/login')
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

app.route('/api/checktoken')
    .post(function(req, res, next) {
      var token = req.body.params.token
      var user = req.body.params.user

      Users.findOne({ id: user }).lean().exec(function(err, docs) {
        if (err)
        {
          throw err
        }

        var test_user = new Users();
        test_user.id = docs.id
        test_user.email = docs.email;

        var testtoken = generateJWT.generateJWT(test_user)

        if (testtoken === token)
        {
          res.json({
              allow: true,
              user: user,
              token: token,
          });
        }

      })
  });


app.route('/api/events')
    .post(function(req, res, next) {
      var new_event = new Events();
      new_event.event_id = req.body.params.event_id;
      new_event.title = req.body.params.title
      new_event.description = req.body.params.description
      new_event.date = req.body.params.date
      new_event.start_time = req.body.params.start_time
      new_event.end_time = req.body.params.end_time



  });



app.listen(5002);
