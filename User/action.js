const process = require ('./process');

module.exports={

registerr(req,res, body){
    process.register(req, res, body);
},

loginn(req, res){
    process.login(req, res);
}

}