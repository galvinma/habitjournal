var express = require('express');
var cors = require('cors')
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var Users = require('./model/users');

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

app.route('/signup')
    .post(function(req, res) {
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
            else{
              console.log("User signup success!");
            }
        });
    });

app.route('/api/login')
    .post(function(req, res) {
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
                res.send(response);
              }
            });
          }
        });
    });

app.listen(5002);
