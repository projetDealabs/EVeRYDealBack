
const chai = require('chai');
const chaiHttp = require('chai-http');
//const mongoose = require("mongoose");
const mocha = require('mocha');


const server = require('./app');
const Deal = require("./User/model");
const assert = require('chai').assert
const should = chai.should();
chai.use(chaiHttp);


describe('user', function () {

    // //ajouter un user
    // it('should add user', function (done) {
    //     chai.request(server)
    //         .post('/users/register')
    //         .send({
    //             username: 'saeesa',
    //             email: 'saleim@gaifl.cm',
    //             password: 'tesee89'
    //         })
    //         .end(function (err, res) {

    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.a('object');
    //             res.body.should.have.property('username');
    //             res.body.should.have.property('email');
    //             res.body.OK.should.have.property('password');
    //             console.log(res.body);
    //             done();
    //         });
    // });

    //se connecter 

    it('should add user', function (done) {
        chai.request(server)
            .post('/users/login')
            .send({
                username: 'saeesa',
                email: 'saleim@gaifl.cm',
                password: 'tesee89'
            })
            .end(function (err, res) {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                console.log(res.body);
                done();
            });
    });

     //décrypter token 

     it('should add user', function (done) {
        chai.request(server)
            .post('/users/decrypt')
            .send({
                username: 'saeesa',
                email: 'saleim@gaifl.cm',
                password: 'tesee89'
            })
            .end(function (err, res) {

                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                console.log(res.body);
                done();
            });
    });
});
