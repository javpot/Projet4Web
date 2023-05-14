const http = require("http");
const router = require('./js/router');
const PORT = 6161;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001:db1admin@sandbox.gwwn6rs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const server = http.createServer((request, response) => {
    console.log(`request recu pour  ${request.url}`);
    router.routeRequest(request, response);
  }
);

server.listen(PORT, () => {
  console.log(`Le Serveur ecoute ${PORT}`); 
});
async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);