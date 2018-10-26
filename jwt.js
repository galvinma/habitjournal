var jwt = require('jsonwebtoken');

module.exports = {
  generateJWT: function(user)
  {
    var t = {
     name: user.id,
     email: user.email,
    };

    var token = jwt.sign(t, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * 14 // two weeks
    });

    return token
  }
}
