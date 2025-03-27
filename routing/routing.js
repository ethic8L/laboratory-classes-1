const homeRouting = require('./homeRouting');
const productRouting = require('./productRouting');
const logoutRouting = require('./logoutRouting');
const { STATUS_CODE } = require('../constants/statusCode');


const requestRouting = (request, response) => {
    const { url, method } = request;
    const date = new Date().toISOString();
}


console.log(`INFO [${date}]: ${method} - ${url}`);

if (url === '/') {
    homeRouting(request, response);
  } else if (url.startsWith('/product')) {
    productRouting(request, response);
  } else if (url === '/logout') {
    logoutRouting(request, response);
  } else if (url === '/kill') {
    console.log(`PROCESS [${date}]: logout has been initiated and the application will be closed`);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Application is shutting down...');
    process.exit();
  } else {
    console.log(`ERROR [${date}]: requested url ${url} doesn’t exist`);
    response.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'text/html' });
    response.end('<h1>404 Not Found</h1><p>The requested URL does not exist.</p>');
  }

module.exports = { requestRouting };