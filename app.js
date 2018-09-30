var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');

var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var Users = require('./model/users');

var mongoDB = 'mongodb://127.0.0.1/database';
mongoose.connect(mongoDB);
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
        signup_user.firstname = req.body.firstname;
        signup_user.lastname = req.body.lastname;
        signup_user.email = req.body.email;
        signup_user.password = req.body.password;

        signup_user.save(function(err) {
            if (err)
                res.send(err);

            console.log("User signup success!");
        });

        // const User = mongoose.model('Users');
        // User.find({}, (err, users) => {
        //   if (err) return next(err);
        //   console.log(users);
        // });

    });

app.use('/api', router);


app.listen(5002);
