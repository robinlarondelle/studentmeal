const express = require('express');
const app = express();

let port = process.env.PORT || 3000;

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