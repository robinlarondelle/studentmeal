/*
 *      server.js
 * 
 *      Hier wordt besloten welke functie moet worden aangeroepen bij elke url
 *      
 *      Door: Sjoerd Scheper & Robin La Rondelle
 */

//imports
const express = require('express');
<<<<<<< HEAD
const expressJWT = require('express-jwt');
const app = express();
const auth = require("./auth/authentication")
const bodyParser = require("body-parser")
=======
const bodyParser = require('body-parser');
const error = require('./classes/error');
>>>>>>> Studentenhuis-Endpoints

const studentenhuis_routes = require('./routes/studentenhuis_routes');
const maaltijd_routes = require('./routes/maaltijd_routes');
const deelnemers_routes = require('./routes/deelnemers_routes');
const auth_routes = require("./routes/auth_routes");
const auth_controller = require("./controllers/auth_controller")
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({'extended': 'true'}))
app.use(bodyParser.json());

//Laat de app gebruik maken van deze routes
app.use('/api', auth_routes);

app.all("*", auth_controller.validateToken);

app.use(studentenhuis_routes);
app.use(maaltijd_routes);
app.use(deelnemers_routes);

//super endpoint methode die je doorstuurt naar de error handler
app.use('*', function(request, response, next){
    console.log('The super endpoint was called');
    let message = {
        'error: ' : 'deze endpoint bestaat niet'
    };
    next(message);
});

//Zeg de server naar welke port hij moet luisteren
app.listen(port, function(){
    console.log('Server app is listening on port ' + port + "\r\n");
    
});

//Error handler
<<<<<<< HEAD
app.use((error, request, response, next) => {

    //Log
    console.log('The catch-all error handler was called');
    console.log("Error: " + error + 
    "\r\n- - - - - - - - - - - - - \r\n");

    //give status
    response.status(404).json(error).end();
=======
app.use((err, req, res, next) => {
    //Log
    console.log('The catch-all error handler was called');
    console.log("Error: " + err);

    if (err.code){
         status = err.code;
    } else {
        status = 404;
    }

    //give status
    res.status(status).json(err).end();
>>>>>>> Studentenhuis-Endpoints
});

module.exports = app;


