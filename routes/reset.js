var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();
router.use(function(req, res, next) {
    next();
});

router.route('/reset')
  .post(function(req, res, next) {

    // Check if user's email exists!!!!!

    var  hbs = require('nodemailer-express-handlebars'),
    email = process.env.MAILER_EMAIL_ID
    pass = process.env.MAILER_PASSWORD
    nodemailer = require('nodemailer');

    var smtpTransport = nodemailer.createTransport({
      service: process.env.MAILER_SERVICE_PROVIDER,
      auth: {
        user: email,
        pass: pass
      }
    });

    var handlebarsOptions = {
      viewEngine: 'handlebars',
      viewPath: './templates/',
      extName: '.html'
    };

    smtpTransport.use('compile', hbs(handlebarsOptions));

    var data = {
        to: req.body.params.email,
        from: email,
        template: 'resetPassword',
        subject: 'Daisy Journal - Password Reset',
        // context: {
        //   url: 'http://localhost:3000/auth/reset_password?token=' + token,
        //   name: user.fullName.split(' ')[0]
        // }
      };

    smtpTransport.sendMail(data, function(err) {
      if (!err) {
        return res.json({ success: true });
      } else {
        return done(err);
      }

  })
})
module.exports = router;
