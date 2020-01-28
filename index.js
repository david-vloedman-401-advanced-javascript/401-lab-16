'use strict';

const file = require('./file');
const util = require('util');
const events = require('./event');
require('./logger');

const directory = `${__dirname}/${process.argv[2]}`;

let readfilePromise = util.promisify(file.read);
let saveFilePromise = util.promisify(file.save);



// readfilePromise(directory)
// .then(results => {
//   events.emit('read', `Read file ${process.argv[2]}`);  
//   const upped = results.toUpperCase();
//   saveFilePromise(upped, directory)
//   .then(results => {
//     events.emit('write', `Wrote to file ${process.argv[2]}`);
//     events.emit('success', 'Process was successful');
//   }).catch(err => events.emit('error', err));
// }).catch(err => events.emit('error', err));

getFile(directory)
  .then(results => {
    writeFile(results, directory)
      .catch(err => events.emit('error', err));
  });

/**
 * 
 * @param {*} directory 
 * @returns results
 */
function getFile(directory){
  return readfilePromise(directory)
    .then(results => {
      events.emit('read', `Read file ${process.argv[2]}`);
      return results.toUpperCase();    
    }).catch(err => events.emit('error', err));  
}
/**
 * 
 * @param {*} data 
 * @param {*} directory 
 */
function writeFile(data, directory){
  return saveFilePromise(data, directory)
    .then(results => {
      events.emit('success', 'Process was successful');
    });
}

module.exports = getFile, writeFile;

