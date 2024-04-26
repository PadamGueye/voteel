const express = require("express");
require("dotenv").config()
var bodyParser = require('body-parser');
const cors = require("cors");
const db = require("./src/models/db.model.js");
const routes = require("./src/routes/routes");
const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

routes(app)

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Error to sync db: " + err.message);
    });

app.get("/", (req, res) => {
    res.json({ message: "Bienvenu sur votre plateforme de vote en ligne Voteel" });
});
//const HOST = "localhost"
//const HOST = "192.168.20.40"
const HOST =  process.env.HOST
const PORT = process.env.PORT || 5000;
app.listen(PORT, HOST,() => {
    console.log(`[+] Serveur is running on port: ${PORT}.`);
    // job.invoke()
    
});

