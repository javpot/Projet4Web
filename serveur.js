const router = require('./js/router');
const path = require('path');
const PORT = 6161;
const express = require('express');
const mongoose = require("mongoose");
const { createRequire } = require('module');
const app = express();
const personneSchema = new mongoose.Schema({
  _id: String,
  nom: String,
  prenom: String,
  email: String,
  phone: String,
  mobile: String,
  entreprise: String,
  adresse: String
});
const PersonneModel = mongoose.model("personne", personneSchema);

app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use("/css", express.static('css'));
app.use("/content/menu.js", express.static('js'));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (request, response) => {
       console.log(request.url)
       console.log(request.body)

       const indexPath = path.join(__dirname,"/content/Acceuil.html")
       if(request.url =="/"){
           response.sendFile(indexPath)
       }

   }
);

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
 });

mongoose.connect("mongodb://localhost:27017/DB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to the MongoDB database..."))
  .catch(error => console.log("Failed to connect to the MongoDB database:", error));

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

// Ajouter un enregistrement dans la DB (CREATE) fonctionne
app.post('/contact', async (request, response) => {
  console.log("Route POST /contact");
  console.log(request.body);
  try {
    let person = new PersonneModel(request.body);
    let result = await person.save();
    const filePath = path.join(__dirname, '/content/Acceuil.html')
    response.sendFile(filePath);
  }
  catch (error) {
    response.status(500).send(error);
  }
});

app.get("/all-contact1", (req,res)=>{
  PersonneModel.find().then(result =>{res.send(result)})     .catch(error=>{         console.log("error")     })
})

// Obtenir la liste des enregistrements contenus dans la DB (READ)
app.get('/all-contact', async (request, response) => {
  console.log("Route GET /contacts");
  try {
    let result = await PersonneModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Obtenir un enregistrement en particulier dans la DB (READ)
app.get("/contact/:_id", async (request, response) => {
  console.log("Route GET /contact/:_id");
  try {
    let result = await PersonneModel.findOne({_id:request.params._id}).exec();
    response.send(result);
  }
  catch (error) {
    response.status(500).send(error);
  }
});

// Mettre à jour un enregistrement dans la DB (UPDATE)
app.put("/contactUpdate/:id", async (request, response) => {
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
app.delete("/contactDelete/:id", async (request, response) => {
  try {
    let result = await PersonneModel.deleteOne({
      _id: request.params.id
    }).exec();
    response.send(result);
  }
  catch (error) {
    response.status(500).send(error);
  }
});

app.get('/detailedContact', async (request, response) => {
  console.log(`request recu pour  ${request.url}`);
  const filePath = path.join(__dirname, '/content/detailedContact.html')
  response.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}...`);
});