'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');
const isJSON = require('is-valid-json');


function UpdateData(srcPath) {
  this._srcPath = srcPath;
  this._filePath = path.dirname(this._srcPath);
  this._fileName = path.basename(this._srcPath, '.json');
}

UpdateData.prototype.convertToYml = function() {
  fs.readFile(this._srcPath, "utf8", (err, data) => {
    if (err) throw err;
    const users = (isJSON(data)) ? JSON.parse(data) : console.log('not a valid json file');
    let updatedUsers, userYml;
    if (users) {
      if (Array.isArray(users)) {
        updatedUsers = users.map((user) => Object.assign(user, {'size': Object.keys(user).length}));
      }
      else {
        updatedUsers = Object.assign(users, {'size': Object.keys(users).length});
      }
    
      userYml = yaml.stringify(updatedUsers, 4);

      fs.writeFile(`${this._filePath}/${this._fileName}.yml`, userYml, (err, data) => {
        if (err) throw err;
        console.log('file created');
      });
    }
  });
}

module.exports = UpdateData;

const updateData = new UpdateData('./data/userDetails.json');
updateData.convertToYml();