//----Import
const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = '00000';
module.exports = {
    generateTokenForUser: function (userData) {
    return jwt.sign({
      username: userData.username,
      role: userData.role,
      id: userData.id,
      email:userData.email,
    },
      JWT_SIGN_SECRET,
      {
        expiresIn: '1h'
      }
    )
  },
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
      },
      getUserId: function (authorization) {
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);
    
        if (token != null) {
          try {
            let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
    
            if (jwtToken != null)
            console.log(jwtToken)
              userId = {
                username: jwtToken.username,
                role: jwtToken.role,
                email: jwtToken.email
              }
          } catch (err) { }
        }
        return userId;
      }
    }