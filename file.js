'use strict';

const fs = require('fs');
const events = require('./event');
require('./logger');


/**
 * Reads the file specified
 * @param {string} file
 * @param {function} callback
 */
const read = (file, callback) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      events.emit('error', 'Failed to read file');
      callback(err);
    } else {
      events.emit('read', 'Successfully read file');
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
      events.emit('error', 'Failed to write to file');
      callback(err);
    } else {
      events.emit('write', 'Wrote to file successfully');
      callback(undefined);
    }
  });
};

module.exports = { read, save };
