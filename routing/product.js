const fs = require('fs');
const { STATUS_CODE } = require('../constants/statusCode');


const renderAddProductPage = (response) => {
  response.setHeader("Content-Type", "text/html");
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Shop – Add product</title>
    </head>
    <body>
      <h1>Add product</h1>
      <form method="POST" action="/product/add">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br>
        <label for="description">Description:</label>
        <textarea id="description" name="description" required></textarea><br>
        <button type="submit">Add Product</button>
      </form>
      <nav>
        <a href="/">Home</a> |
        <a href="/product/new">Newest product</a> |
        <a href="/logout">Logout</a>
      </nav>
    </body>
    </html>
  `;
  response.write(htmlContent);
  response.end();
};


const renderNewProductPage = (response) => {
  response.setHeader("Content-Type", "text/html");
  fs.readFile('product.txt', 'utf8', (err, data) => {
    let htmlContent;
    if (err || !data) {
      htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Shop – Newest product</title>
        </head>
        <body>
          <h1>Newest product</h1>
          <p>No new products available.</p>
          <nav>
            <a href="/">Home</a> |
            <a href="/product/add">Add product</a> |
            <a href="/logout">Logout</a>
          </nav>
        </body>
        </html>
      `;
    } else {
      htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Shop – Newest product</title>
        </head>
        <body>
          <h1>Newest product</h1>
          <p>${data}</p>
          <nav>
            <a href="/">Home</a> |
            <a href="/product/add">Add product</a> |
            <a href="/logout">Logout</a>
          </nav>
        </body>
        </html>
      `;
    }
    response.write(htmlContent);
    response.end();
  });
};

const addNewProduct = (request, response) => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', () => {
    const parsedData = new URLSearchParams(body);
    const name = parsedData.get('name');
    const description = parsedData.get('description');
    const productData = `Name: ${name}, Description: ${description}`;

    fs.writeFile('product.txt', productData, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Internal Server Error');
        return;
      }

      response.writeHead(STATUS_CODE.FOUND, { Location: '/product/new' });
      response.end();
    });
  });
};

const productRouting = (request, response) => {
  const { url, method } = request;

  if (url === '/product/add' && method === 'GET') {
    renderAddProductPage(response);
  } else if (url === '/product/add' && method === 'POST') {
    addNewProduct(request, response);
  } else if (url === '/product/new') {
    renderNewProductPage(response);
  } else {
    console.error(`ERROR: requested url ${url} doesn’t exist`);
    response.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'text/html' });
    response.end('<h1>404 Not Found</h1><p>The requested URL does not exist.</p>');
  }
};

module.exports = productRouting;