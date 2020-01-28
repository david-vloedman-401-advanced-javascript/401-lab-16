'use strict';

const events = require('./event');

events.on('read', payload => log('Read file', payload));
events.on('error', payload => log('Error', payload));
events.on('write', payload => log('Write file', payload));
events.on('success', payload => log('Success', payload))

/**
 * 
 * @param {*} event 
 * @param {*} payload 
 */
function log(event, payload) {  
  let time = new Date();
  console.log({ event, time, payload });
}