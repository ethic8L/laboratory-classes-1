const { PORT } = require('./config');


// 📦 Musisz zaimportować tutaj moduł 'http'.
const http = require('http');

// 📦 Żeby użyć tutaj PORT, musisz zaimportować go z modułu konfiguracyjnego z pliku 'config.js'.
// 📦 Zaimportuj funkcję 'requestRouting' z modułu 'routing/routing.js'.
const { requestRouting } = require('./routing/routing');

// 🏗 Tutaj, stwórz funkcję 'requestListener, która przekazuje 'request' i 'response' do 'requestRouting'.
const requestListener = (request, response) => {
    requestRouting(request, response);
}

// 🏗 Tutaj, stwóz serwer Node.js. Pamiętaj przypisać go do stałej i przekazać mu 'requestListener'.
const server = http.createServer(requestListener);

// 🏗 Uruchom serwer na porcie PORT.
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
