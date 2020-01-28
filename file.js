'use strict';

const fs = require('fs');
const events = require('./event')


/**
 * Reads the file specified
 * @param {string} file
 * @param {function} callback
 */
const read = (file, callback) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(undefined, data.toString());
    }
  });
};

/**
 *
 * @param {JSON} data
 * @param {string} fileName
 * @param {object} rules
 * @param {function} callback
 */
const save = (data, fileName, callback) => {  
    const buffer = Buffer.from(data);
    fs.writeFile(fileName, buffer, err => {
      if (err) {
        callback(err);
      } else {
        callback(undefined);
      }
    });
};

module.exports = { read, save };
