
const chai = require('chai');
const chaiHttp = require('chai-http');
//const mongoose = require("mongoose");
const mocha = require('mocha');


const server = require('../app');
const Deal = require("../Deal/model");
const assert = require('chai').assert
const should = chai.should();
chai.use(chaiHttp);


describe('Deal', function () {

  // Deal.collection.drop();

  // afterEach(function (done) {
  //   Deal.collection.drop();
  //   done();
  // });

  // //afficher tous les deals
  it('should list ALL deals', function (done) {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        console.log(res.body);
        done();
      });
  });

  
  //afficher un deal
  it('should list a SINGLE deal', function (done) {
    chai.request(server)
      .get('/5d024984eabc663a4fb54f7a')
      .end(function (err, res) {
        //  res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        console.log(res.body);
        done();
      });

  });

  //ajouter un deal
  it('should add deal', function (done) {
    chai.request(server)
      .post('/create')
      .send({
        name: 'lenovo',
        prix: '4300',
        username: 'salim',
        description: 'test23333',
        lien: 'testt',
        dateFin: '2019-12-15',
        compteur: 0,
        vote: [],
        picture: 'image-1560429214855.jpg',

      })
      .end(function (err, res) {

        res.should.have.status(200);
        res.should.be.json;
        assert.typeOf('name', 'string', 'name doit etre de type string');
        //assert.typeOf('prix','Number', 'le prix doit etre de type number');
        assert.typeOf('lien', 'string', 'le lien doit etre de type string');
        //assert.typeOf('dateFin', 'date', 'dateFin doit etre de type date');
        assert.typeOf('description', 'string', 'description doit etre de type string');
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('prix');
        res.body.should.have.property('lien');
        res.body.should.have.property('_id');
        console.log(res.body);
        done();
      });
  });

  //ajouter un commentaire
  it('should add comment', function (done) {
    chai.request(server)
      .post('/5d0249222d00b335235584a2/comment')
      .send({
        contenu: 'très bonne affaire',

      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        assert.typeOf('content', 'string', 'name doit etre de type string');
        res.body.should.be.a('object');
        res.body.should.have.property('contenu');
        res.body.should.have.property('_id');
        console.log(res.body);
        done();
      });
  });
  //  //mettre à jour un deal
  it('should update a Deal', function (done) {
    chai.request(server)
      .get('/update')
      .end(function (err, res) {
        chai.request(server)
          .put('/update/5d02525e9ad93860fb02c199')
          .send({
            'name': 'jojo',
            'prix': '11',
            'description': 'test test',
            'lien': 'test',
            'dateFin': '2019-12-15', })
          .end(function (erreur, response) {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            // response.body.should.have.property('name');
            //response.body.should.have.property('_id');
            console.log(res.body);
            done();
          });
      });
  });

  // //supprimer un deal
  it('should delete deal', function (done) {
    chai.request(server)
      .get('/supp')
      .end(function (err, res) {
        chai.request(server)
          .delete('/supp/5d02525e9ad93860fb02c199')
          .end(function (erreur, response) {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('name');
            response.body.should.have.property('_id');

            done();
          });
      });
  });

});
