const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 4200;
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content - Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/DB1", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to the MongoDB database..."))
    .catch(error => console.log("Failed to connect to the MongoDB database:", error));
/*
const PersonneModel = mongoose.model("personne", personneSchema);
// Ajouter un enregistrement dans la DB (CREATE)
app.post('/personne', async (request, response) => {
    console.log("Route POST /personne");
    console.log(request.body);
    try {
        let person = new PersonneModel(request.body);
        let result = await person.save();
        response.send(result);
    }
    catch (error) {
        response.status(500).send(error);
    }
});
// Obtenir la liste des enregistrements contenus dans la DB (READ)
app.get('/personnes', async (request, response) => {
    console.log("Route GET /personnes");
    try {
        let result = await PersonneModel.find().exec();
        response.send(result);
    }
    catch (error) {
        response.status(500).send(error);
    }
});
// Obtenir un enregistrement en particulier dans la DB (READ)
app.get("/personne/:id", async (request, response) => {
    console.log("Route GET /personne/:id");
    try {
        let person = await PersonneModel.findById(request.params.id).exec();
        response.send(person);
    }
    catch (error) {
        response.status(500).send(error);
    }
});
// Mettre à jour un enregistrement dans la DB (UPDATE)
app.put("/personne/:id", async (request, response) => {
    console.log("Route PUT /personne/:id");
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
app.delete("/personne/:id", async (request, response) => {
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
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}...`);
});
*/