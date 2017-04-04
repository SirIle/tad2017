import chai from 'chai';
import rest from 'request-json';
import cp from 'child_process';

/* eslint-disable no-await-in-loop */

chai.should();
const client = rest.createClient('http://localhost:3000/');
const URL = 'hello';

describe('Test the function', () => {
  let server;

  before(async() => {
    server = cp.exec('npm start');
    while (await new Promise(resolve => client.head('/', err => resolve(err)))) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  });

  it('Hello-method returns http status code 200', (done) => {
    client.get(`${URL}`, (err, res) => {
      res.statusCode.should.equal(200);
      done();
    });
  });

  after(() => server.kill());
});

