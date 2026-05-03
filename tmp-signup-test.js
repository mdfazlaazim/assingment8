const http = require('http');
const data = JSON.stringify({name:'Test User',email:'testuser123@example.com',password:'password123',callbackURL:'/login'});
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/sign-up/email',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};
const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => (body += chunk));
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    console.log('HEADERS', JSON.stringify(res.headers, null, 2));
    console.log('BODY', body);
  });
});
req.on('error', (err) => {
  console.error('ERROR', err.message);
});
req.write(data);
req.end();
