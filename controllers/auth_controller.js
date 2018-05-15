const auth = require('../auth/authentication');
const moment = require("moment");

module.exports = {

    //Token validatie methode
    validateToken:  function(request, response, next) {

        //Log
        console.log("validating token...");

        //Haal token op uit de header
        const token = request.header("x-access-token") || "no-token-given";

        //Decodeer token
        auth.decodeToken(token, (error, payload) => {

            if(error)   {

                //token afgekeurd
                const error = new ApiError(error.message || error, 401);
                next(error);

            } else{

                //token goedgekeurd
                console.log("Token approved! payload: \r\n");
                console.dir(payload);
                request.user = payload.sub;
                next();
                
            }
        })
    },

    //Login functie
    login: function (request, response) {
        
        const email = request.body.email;        
        const password = request.body.password;

        console.log("received: " + email + ", "+ password);
    },

    //Register functie
    register: function (request, response) {

        //Alle gegevens uit de body halen
        var firstname = request.body.firstname  || "";
        var lastname = request.body.lastname    || "";
        var email = request.body.email          || "";
        var password = request.body.password    || "";

        //Als een van de velden niet leeg is dan:
        if(!([firstname, lastname, email, password].includes(''))) {
            //Maak hier een token en een json van voor de response
            const token = auth.encodeToken(firstname, email);
            const json = {
                "token": token,
                "email": email
            }
            
            //response
            response.status(200).json(json);
        }

        else if(/*gegevens al bestaan*/ false)    {
            const json = {
                "message": "Niet geautoriseerd (geen valid token)",
                "code": 401,
                "datetime": moment()
            }

            response.status(401).json(json);
        }

        //Anders, dan:
        else{
            const json = {
                "message": "Een of meer properties in de request body ontbreken of zijn foutief",
                "code": 412,
                "datetime": moment()
            }

            response.status(414).json(json);
        }
    },
}