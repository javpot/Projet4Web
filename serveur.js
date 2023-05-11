const http = require("http");
const router = require('./js/router');
const PORT = 6161;

const server = http.createServer((request, response) => {
    console.log(`request recu pour  ${request.url}`);
    router.routeRequest(request, response);
  }
);

server.listen(PORT, () => {
  console.log(`Le Serveur ecoute ${PORT}`);
});