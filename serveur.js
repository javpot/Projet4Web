const router = require('./js/router');
const path = require('path');
const PORT = 6161;
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const personneSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: String,
  phone: String,
  mobile: String,
  entreprise: String,
  adresse: String
});

app.use(express.static(__dirname + '/'));

app.get('/', (request, response) => {
  console.log(`request recu pour  ${request.url}`);
  router.routeRequest(request, response);
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content - Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb://127.0.0.1:27017/DB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to the MongoDB database..."))
  .catch(error => console.log("Failed to connect to the MongoDB database:", error));

const PersonneModel = mongoose.model("personne", personneSchema);

// Create Contact
app.get("/addContact/", async (request, response) => {
  console.log("Route GET /addContact/");
  try {
    const filePath = path.join(__dirname, '/content/addContact.html')
    response.sendFile(filePath);
  }
  catch (error) {
    response.status(500).send(error);
  }
});

// Ajouter un enregistrement dans la DB (CREATE)
app.post('/contact', async (request, response) => {
  console.log("Route POST /contact");
  console.log(request.body);
  try {
    let person = new PersonneModel(request.body.nom, request.body.prenom, request.body.email, request.body.phone);
    let result = await person.save();
    response.send(result);
  }
  catch (error) {
    response.status(500).send(error);
  }
});

// Obtenir la liste des enregistrements contenus dans la DB (READ)
app.get('/contacts', async (request, response) => {
  console.log("Route GET /contacts");
  try {
    let result = await PersonneModel.find().exec();
    response.send(result);
  }
  catch (error) {
    response.status(500).send(error);
  }
});
// Obtenir un enregistrement en particulier dans la DB (READ)
app.get("/contact/:id", async (request, response) => {
  console.log("Route GET /contact/:id");
  try {
    let person = await PersonneModel.findById(request.params.id).exec();
    response.send(person);
  }
  catch (error) {
    response.status(500).send(error);
  }
});
// Mettre à jour un enregistrement dans la DB (UPDATE)
app.put("/contact/:id", async (request, response) => {
  console.log("Route PUT /contact/:id");
  console.log(request.body);
  try {
    let person = await PersonneModel.findById(request.params.id).exec();
    person.set(request.body);
    let result = await person.save();
    response.send(result);
  }
  catch (error) {
    response.status(500).send(error);
  }
});
// Effacer un enregistrement (EFFACER)
app.delete("/contact/:id", async (request, response) => {
  try {
    let result = await PersonneModel.deleteOne({
      _id:
        request.params.id
    }).exec();
    response.send(result);
  }
  catch (error) {
    response.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}...`);
});