//----Import
var jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET= '00000';
module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
            username:userData.username,
            role: userData.role,
            id:userData.id,
        },
        JWT_SIGN_SECRET,
        {
            expiresIn:'1h'
        }
        )
    },
    decrypt:function(token){
        console.log(token.token)
        return  jwt.decode(token.token,{complete: true});
    
    }
}