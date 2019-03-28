const process = require('./process');

module.exports = {

    register(req, res, body) {
        process.register(req, res, body);
    },

    login(req, res) {
        process.login(req, res);
    },
    decrypt(req, res) {
        process.getuserprofile(req, res)

    }

}