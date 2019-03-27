const process = require ('./process');

module.exports={

register(req,res, body){
    process.register(req, res, body);
},

loginn(req, res){
    process.login(req, res);
}

}