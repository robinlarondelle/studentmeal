const auth = require('../auth/authentication');

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
        var firstname = request.body.firstname  || "test-firstname";
        var lastname = request.body.lastname    || "test-lastname";
        var email = request.body.email          || "test-email";
        var password = request.body.password    || "test-password";

        //Maak hier een token en een json van voor de response
        const token = auth.encodeToken(firstname, email);
        const json = {
            "token": token,
            "email": email
        }
        
        //response
        response.status(200).json(json);
    },
}