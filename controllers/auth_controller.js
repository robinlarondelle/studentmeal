const auth = require('../auth/authentication');
const moment = require("moment");
const db = require('../config/database');
const ApiError = require('../classes/error');
const bcrypt = require('bcrypt');
const assert = require("assert")

const saltRounds = 10;

module.exports = {


    //Token validatie methode
    validateToken: function (request, response, next) {

        //Log
        console.log("validating token...");

        //Haal token op uit de header
        const token = request.header("authorization") || "";

        //Als de token leeg is dan moet een 401 error met bericht worden gegeven
        if (token.includes("")) {

            //stel een json op
            const json = {
                "message": "Niet geautoriseerd (geen valid token)",
                "code": 401,
                "datetime": moment()
            }

            if (!token) {
                console.log("no token received");
                const tokenError = new ApiError("Geen token meegegeven", 403);
                response.status(403).json(tokenError);
            } else {
                auth.decodeToken(token, (err, payload) => {
                    if (err) {
                        console.log("Error when decoding token");
                        const decodeError = new ApiError(error.message || error, 401);
                        next(decodeError);
                    } else {
                        console.log("token approved");
                        next();
                    }
                })
            }
        }
    },

    //Login functie
    login: function (request, response) {

        //Haal de gegevens uit de body op
        const email = request.body.email;
        const password = request.body.password;

        console.log("received: " + email + ", " + password);

        function validateEmail(email) {
            let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return re.test(String(email).toLowerCase());
        }

        let passedAssert = true;

        try {
            assert(validateEmail(email), "email ongeldig");
        } catch (e) {
            passedAssert = false;
            console.log("invalid email");
            const emailError = new ApiError("geen geldige email gegeven", 412);
            response.status(412).json(emailError);
        }

        if (passedAssert) {

            //Stel een query voor de db samen
            const query = {
                sql: "SELECT * FROM user WHERE email = \'" + email + "\';",
                timeout: 2000
            }

            //Voer query uit
            db.query(query, function (error, rows) {
                if (error) {
                    res.status(500).json(error);
                } else {

                    console.log(rows);

                    //Als er informatie in de rows zit, dan is er een match en zit de user in de db
                    if (rows.length > 0) {

                        var token;

                        if (bcrypt.compareSync(password, rows[0].Password)) {
                            token = auth.encodeToken(rows[0].ID, rows[0].Email);
                        } else {
                            console.log("passwords didnt match");
                            const passwordError = new ApiError("passwords matchen niet", 412);
                            response.status(412).json(passwordError);
                        }

                        const json = {
                            "token": token,
                            "email": rows[0].Email
                        }
                        response.status(200).json(json);
                    } else {

                        const newError = new ApiError("geen overeenkomst, heb je je al geregistreerd?", 401);
                        response.status(401).json(newError);
                    }
                }
            })
        }
    },


    //Register functie
    register: function (request, response) {

        //Maak een hashed wachtwoord aan
        const hashedRegisterPassword = bcrypt.hashSync(request.body.password, saltRounds);

        //Alle gegevens uit de body halen
        var firstname = request.body.firstname;
        var lastname = request.body.lastname;
        var email = request.body.email;
        var password = hashedRegisterPassword;

        //functie om de geldigheid van de email te controleren
        function validateEmail(email) {
            let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return re.test(String(email).toLowerCase());
        }

        var passedAssert = true;

        try {
            assert(firstname.trim().length > 1, "Firstname must be 2 or more characters");
            assert(lastname.trim().length > 1, "Lastname must be 2 or more characters");
            assert(validateEmail(email), "No valid email");
            assert(request.body.password.trim().length > 1, "password must be 2 or more characters")
        } catch (e) {
            passedAssert = false;

            console.log("Een van de ingevulde gegevens voldoet niet aan de eisen");
            const newError = new ApiError(e.message || e, 412);
            response.status(412).json(newError);
        }

        console.log("Status van de assert: " + passedAssert);


        //check of een van de velden niet leeg is
        if (passedAssert) {

            //check of de persoon niet al in de database bestaat (met email)
            var query = {
                sql: "SELECT * FROM user WHERE email = \'" + email + "\'",
                timeout: 2000
            }
            console.log("\r\nThe following query is executed: \r\n" + JSON.stringify(query));

            db.query(query, function (error, rows, fields) {

                //Error catch
                if (error) {
                    console.log("An error occured: " + error);
                    response.status(404).json(error);
                    return;


                    //Kijk of het emailadres al voorkomt in de database. Als de info in de rows leeg is, dan is het emailadres uniek
                    //Als er wel info in de rows zit, dan wordt er een error gegeven
                } else if (rows[0]) {

                    console.log("User already exists");
                    const duplicateError = new ApiError("gebruiker bestaat al in database", 401);
                    response.status(401).json(duplicateError);
                    return

                    //zo niet dan wordt een nieuw persoon aangemaakt in de database
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

                    //Query uitvoeren die een nieuwe user in de database voert
                    db.query(query, function (error, rows) {
                        if (error) {
                            console.log("Database threw error: \r\n" + error);
                            response.status(404).json(error);

                            //Query geslaagd
                        } else {
                            let receivedID = rows.insertId;
                            console.log("Added new user in the database");

                            //query om de gebruiker uit de database te halen
                            var query = {
                                sql: "SELECT * FROM user WHERE ID = \'" + receivedID + "\';",
                                timeout: 2000
                            }

                            db.query(query, function (error, rows, fields) {

                                //Error catch
                                if (error) {
                                    console.log("An error occured: \r\n" + error);
                                    response.status(404).json(error);
                                }

                                //Maak een token en stuur hem terug
                                else {
                                    console.log("Got the following query: \r\n" + JSON.stringify(rows));
                                    var ID = rows.insertId;
                                    var token = auth.encodeToken(rows[0].ID, rows[0].Email);

                                    var json = {
                                        "token": token,
                                        "email": email
                                    }

                                    response.status(200).json(json);
                                }
                            })
                        }
                    })
                }
            })
        }
    }
}