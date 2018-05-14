let mysql = require('mysql');
let config = require('./config');

let connection = mysql.createConnection({
    host : process.env.DB_HOST || config.dbHost,
    user : process.env.DB_USER || config.dbUser,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE || config.dbDatabase
});

connection.connect(function(error) {
    if (error) {
        console.log(error);
        return;
    } else {
        console.log("Connected to " + config.dbHost + ":" + config.dbDatabase);
    }
});

module.exports = connection;