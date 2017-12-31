const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const UpdateData = require('./../index.js');
const dataPath = './../data/userDetails.json';
const users = require(dataPath);


describe('UpdateData', function(){
  it('the provided src path to be a valid string', function(){
    const updateData = new UpdateData(dataPath);
    expect(updateData._srcPath).to.be.a('string');
  });

  it('the provided file should contain an array or objects', function(){
    //const updateData = new UpdateData(dataPath);
    if(Array.isArray(users)) {
      expect(users).to.be.a('array');
    }
    else {
      expect(users).to.be.a('object');
    }
  });

  it('the new props size to be included', function(){
    let user = {
      "_id": "5a45fd2db435eb5689279b4e",
      "index": 0,
      "isActive": false,
      "picture": "http://placehold.it/32x32",
      "age": 29,
      "name": "Sue Knox",
      "gender": "female",
      "email": "sueknox@enthaze.com",
      "phone": "+1 (811) 442-2016",
      "friends": [{
          "id": 0,
          "name": "Jordan Dean"
        },
        {
          "id": 1,
          "name": "Tisha Dudley"
        }
      ]
    };
    let updatedUser = Object.assign(user, {'size': Object.keys(user).length});
    updatedUser.should.have.property('size');
  });
});