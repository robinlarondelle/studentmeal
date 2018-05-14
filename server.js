const express = require('express');
const app = express();

let studentenhuis_routes = require('./routes/studentenhuis_routes');
let maaltijd_routes = require('./routes/maaltijd_routes');
let deelnemers_routes = require('./routes/deelnemers_routes');

let port = process.env.PORT || 3000;

app.use(studentenhuis_routes);
app.use(maaltijd_routes);
app.use(deelnemers_routes);

app.use('*', function(req, res, next){
    console.log('The super endpoint was called');
    let message = {
        'error: ' : 'deze endpoint bestaat niet'
    };
    next(message);
});

app.listen(port, function(){
    console.log('Server app is listening on port ' + port);
});

app.use((err, req, res, next) => {
    console.log('The catch-all error handler was called');
    console.log(err);
    res.status(404).json(err).end();
});