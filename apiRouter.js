//----Import
var express= require('express');
var usersCtrl = require('./User/usersCtrl');

//----Router
exports.router = (function(){
    var apiRouter = express.Router();

    apiRouter.route('/users/register').post(usersCtrl.register);
    apiRouter.route('/users/login').post(usersCtrl.login);
    apiRouter.route('/users/test').post(usersCtrl.test);
    return apiRouter;
})();