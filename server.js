'use strict';

const http = require('node:http');
const { isPrime } = require('./prime');

const port = Number(process.env.PORT || 3000);

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

  if (request.method === 'GET' && url.pathname === '/healthz') {
    response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('ok\n');
    return;
  }

  if (request.method === 'GET' && url.pathname === '/') {
    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.end(`<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Prime Number Checker</title></head>
  <body>
    <h1>Prime Number Checker</h1>
    <p>Check a number at <code>/api/prime/17</code>.</p>
    <p>Example: <a href="/api/prime/17">Is 17 prime?</a></p>
  </body>
</html>`);
    return;
  }

  const match = url.pathname.match(/^\/api\/prime\/(-?\d+)$/);
  if (request.method === 'GET' && match) {
    const number = Number(match[1]);
    if (!Number.isSafeInteger(number)) {
      response.writeHead(400, { 'content-type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ error: 'Number must be a safe integer' }));
      return;
    }

    const prime = isPrime(number);
    response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ number, isPrime: prime, message: `${number} ${prime ? 'is' : 'is not'} a prime number` }));
    return;
  }

  response.writeHead(404, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Prime Number Checker listening on port ${port}`);
});
