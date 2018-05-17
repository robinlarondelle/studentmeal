const auth = require('../auth/authentication');
const moment = require("moment");
const db = require('../config/database');
const ApiError = require("../classes/error");
const assert = require('assert');

module.exports = {

    //Token validatie methode
    validateToken: function (request, response, next) {

        //Log
        console.log("validating token...");

        //Haal token op uit de header
        const token = request.header("authorization") || "";

        //Als de token leeg is dan moet een 401 error met bericht worden gegeven
        if (token === undefined) {
            //stel een json op
            const json = {
                "message": "Niet geautoriseerd (geen valid token)",
                "code": 401,
                "datetime": moment()
            };

            response.status(401).json(json);
            return
        }

        //Decodeer token
        auth.decodeToken(token, (error, payload) => {

            if (error) {
                //token afgekeurd
                const error = new ApiError('Not authorised', 401);
                next(error);

            } else {

                //token goedgekeurd
                console.log("Token approved! payload: \r\n");
                console.dir(payload);
                request.user = payload.sub;
                next();
            }
        })
    },


    //Login functie
    login: function (request, response, next) {
        try {
            console.log(request.body.email + request.body.password);
            assert(typeof (request.body.email) === 'string', 'email must be a string');
            assert(typeof (request.body.password) === 'string', 'password must be a string');
        } catch (e) {
            const err = new ApiError(e.toString(), 412);
            next(err);
            return
        }

        let email = request.body.email;
        let password = request.body.password;

        //Stel een query voor de db samen
        const query = {
            sql:"SELECT ID FROM user WHERE email = \'"+email+"\' AND password = \'"+password+"\';",
            timeout:2000
        };

        db.query(query, function(error, rows)    {
            if(error)   {
                console.log("An error occured..");              
            }

            //Als er informatie in de rows zit, dan is er een match en zit de user in de db
            else if(rows[0])    {                
                const ID = rows.insertId;
                const token = auth.encodeToken(ID, email);              

                const json = {
                    "token" :   token,
                    "email" :   email
                };

                response.status(200).json(json);
            }

            //Als er geen informatie in de database zit dan:
            else{
                const json = {
                    "message"   :   "Er was geen overeenkomst, heb je je al geregistreerd?",
                    "code"      :   "401",
                    "datetime"  :   moment()
                };

                response.status(412).json(json);
            }
        })
    },


    //Register functie
    register: function (request, response, next) {
        try {
            assert(typeof (request.body.firstname) === 'string', 'firstname must be a string.');
            assert(typeof (request.body.lastname) === 'string', 'lastname must be a string.');
            assert(typeof (request.body.email) === 'string', 'email must be a string');
            assert(typeof (request.body.password) === 'string', 'password must be a string');
            assert(request.body.firstname.length > 2, 'firstname must be longer than two characters');
            assert(request.body.lastname.length > 2, 'lastname must be longer than two characters');
        } catch (e) {
            const err = new ApiError(e.toString(), 412);
            next(err);
            return
        }

        //Alle gegevens uit de body halen
        var firstname = request.body.firstname || "";
        var lastname = request.body.lastname || "";
        var email = request.body.email || "";
        var password = request.body.password || "";


        //check of de persoon niet al in de database bestaat (met email)
        let query = {
            sql: "SELECT * FROM user WHERE email = \'" + email + "\'",
            timeout: 2000
        };
        db.query(query, function (error, rows) {
            //Error catch
            if (error) {
                console.log("An error occured: " + error);
                response.status(401).json(error);
                return;
            } else if (rows[0]) {
                console.log("The database already contained the given email.");
                const databaseError = new ApiError("u bent al geregistreerd", 412);

                response.status(412).json(databaseError);
                return;
            } else {
                console.log("Emailaddress is unique in database, making a new user");

                //Making a query
                var query = {
                    sql: "INSERT INTO `user` (Voornaam, Achternaam, Email, Password)" +
                        "VALUES " +
                        "(\'" + firstname + "\'," +
                        "\'" + lastname + "\'," +
                        "\'" + email + "\'," +
                        "\'" + password + "\');",
                    timeout: 2000
                }

                console.log("\r\nExecuting following query: \r\n" + JSON.stringify(query));
                
                //Query uitvoeren die een nieuwe user in de database voert
                db.query(query, function (error, rows) {
                    if (error) {

                        //Database gooit een error
                        console.log("Database threw error: \r\n" + error);
                    } else {
                        console.log("Added user to database"+
                                    "\r\n- - - - - - - - - - - - - \r\n");
                    }
                })

                var query =     {
                    sql : "SELECT ID FROM user WHERE email = \'" + email + "\';",
                    timeout: 2000
                }

                db.query(query, function(error, rows)   {

                    //Error catch
                    if(error)   {
                        console.log("An error occured: \r\n" + error);
                    } 
                    
                    //Maak een token en stuur hem terug
                    else {
                        console.log("Got the following query: \r\n" + JSON.stringify(rows));
                        var ID = rows.insertId;
                        var token = auth.encodeToken(ID, email);
                        var json = {
                            "token" :   token,
                            "email" :   email
                        }
                        
                        response.status(200).json(json);
                    }
                })
            }
        })
    },
    get: function(req, res, next){
        let err = new ApiError('Can\'t use get on /api/login', 404);
        next(err);
    }
};