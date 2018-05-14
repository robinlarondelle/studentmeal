/*
 *      server.js
 * 
 *      Hier wordt besloten welke functie moet worden aangeroepen bij elke url
 *      
 *      Door: Sjoerd Scheper & Robin La Rondelle
 */


//imports
const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());

let studentenhuis_routes = require('./routes/studentenhuis_routes');
let maaltijd_routes = require('./routes/maaltijd_routes');
let deelnemers_routes = require('./routes/deelnemers_routes');
let port = process.env.PORT || 3000;


//Laat de app gebruik maken van deze routes
app.use(studentenhuis_routes);
app.use(maaltijd_routes);
app.use(deelnemers_routes);

//super endpoint methode die je doorstuurt naar de error handler
app.use('*', function(req, res, next){
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
app.use((err, req, res, next) => {

    //Log
    console.log('The catch-all error handler was called');
    console.log("Error: " + err + 
    "\r\n- - - - - - - - - - - - - \r\n");

    //give status
    res.status(404).json(err).end();
});

module.exports = app;