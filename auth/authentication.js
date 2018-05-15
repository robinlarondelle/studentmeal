
 //Created by dkroeske on 25/04/2018.
const settings = require('../config.json');
const moment = require('moment');
const jwt = require('jwt-simple');


// Encode (van username naar token)
function encodeToken(userID, userEmail) {

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

    //Log de waarde
    console.log(encode);

    //Geef de waarde terug
    return encode;
}



// Decode (van token naar username)
function decodeToken(token, callback) {

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

    } catch(error) {

        callback(error, null);        
    }

}

//Exports
module.exports = {
    encodeToken,
    decodeToken
};


