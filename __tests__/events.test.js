
'use strict';

const file = require('../file');
const util = require('util');

const readfilePromise = util.promisify(file.read);


jest.mock('fs');




describe('Testing the events, file and such', ()=>{
  it('should successfully read a file', (done)=>{
    readfilePromise('File', (err, data)=> {
      expect(data).toBe('Success');
      done();
    });
  });


  it('when given a bad file, returns an error', done => {
    const directory = `${__dirname}/../../data/bad.txt`;
    file.read(directory, (err, data) => {
      expect(err).toBeDefined();
      done();
    });
  });

  it('should log when a file is read', ()=>{    
    const spy = jest.spyOn(console, 'log');
    file.read('file', (err, data)=> {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should log when a file is written', () => {
    const spy = jest.spyOn(console, 'log');
    file.save('data','file', (err, data) => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should log when a file is written and error is thrown', () => {
    const spy = jest.spyOn(console, 'log');
    const directory = `${__dirname}/../../data/bad.txt`;
    file.save('data', directory, (err, data) => {
      expect(spy).toHaveBeenCalled();
    });
  });
});