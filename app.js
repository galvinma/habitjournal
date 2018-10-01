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

mongoose.connect('mongodb://127.0.0.1/database');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var router = express.Router();

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res) {
    console.log("got to index")
});


router.route('/signup')
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

router.route('/login')
    .post(function(req, res) {
        console.log("login post...")
        var e = req.body.params.email;
        var p = req.body.params.password;

        Users.findOne({ email: e }).lean().exec(function(err, docs) {
          if (err)
          {
            console.log(err)
          }
          else
          {
            console.log("got creds...");
            console.log("entered password: "+p)
            console.log("salt: "+docs.password)
            bcrypt.compare(p, docs.password, function(err, res) {
              if (err)
              {
                console.log(err)
              }
              else
              {
                console.log(res)
              }
            });

          }
        });
    });

router.get('/who', function(req, res) {
  // get all the users
  Users.find({}, function(err, Users) {
  if (err) throw err;

  // object of all the users
  console.log(Users);
  });
});


app.use('/api', router);


app.listen(5002);
