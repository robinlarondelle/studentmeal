//Created by dkroeske on 25/04/2018.
const settings = require('../config.json');
const moment = require('moment');
const jwt = require('jwt-simple');
const error = require('../classes/error');
const assert = require('assert');

module.exports = {

    // Encode (van username naar token)
    encodeToken: function (userID, userEmail) {

        //Asserts
        try {

            //assert email
            assert(typeof (userEmail) === "string", "userID must be a string.");

            //assert userID
            assert(typeof (userID) === "string", "userID must be a string.");
            assert(isNaN(userID) === false, "userID must be a number");
            assert(userId.indexOf('-') === -1, "userID can\'t be negative");
            assert(userId.indexOf('.') === -1, "userID can\'t be a decimal");

        } catch (e) {

            //Geef een nieuwe error omdat een assert is mislukt
            // const ApiError = new error(e.toString(), 422);
            // next(ApiError);
            // return;

        }

        //Payload maken
        const payload = {

            //een "houdsbaarheidsdatum" toevoegen aan de code
            exp: moment().add(10, 'days').unix(),
            iat: moment().unix(),
            sub: userID,
            email: userEmail
        };

        //Maak een encoded waarde aan
        const encode = jwt.encode(payload, settings.secretkey);
        console.log(encode);

        //Geef de waarde terug
        return encode;
    },


    // Decode (van token naar username)
    decodeToken: function (token, callback, next) {

        try{

            //token assert
            assert(typeof (token) === "string", "Token must be a string");
            assert(token.includes('') === false, "Token may not be empty");

        } catch(e)  {

            //Error handler
            const ApiError = new error(e.toString(), 422);
            next(ApiError);
            return;
            
        }

        try {

            //verkrijg de payload
            const payload = jwt.decode(token, settings.secretkey);

            //Haal de tijdwaarde op en vergelijk dit
            const now = moment().unix();

            //Check of de huidige tijdwaarde groter is dan de  tijdwaarde van de payload
            if (now > payload.exp) {
                console.log("Token has expired");
            }

            // Return
            callback(null, payload);

        } catch (error) {

            callback(error, null);
        }

    }
}
