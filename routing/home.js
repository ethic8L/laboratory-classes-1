const homeRouting = (request, response) => {

  response.setHeader("Content-Type", "text/html");

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Shop – Home</title>
    </head>
    <body>
      <h1>Home</h1>
      <nav>
        <a href="/product/add">Add product</a> |
        <a href="/product/new">Newest product</a> |
        <a href="/logout">Logout</a>
      </nav>
    </body>
    </html>
  `;

  response.write(htmlContent);

  response.end();
};

module.exports = homeRouting;