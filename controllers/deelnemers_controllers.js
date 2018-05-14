let express = require('express');


//Controller voor de deelnemers
module.exports = {

    
    //Maak een nieuwe deelnemer
    createDeelnemer(request, response, next){

        //verkrijg de meegegeven gegevens
        let huisID = request.params.huisId;
        let maaltijdID = request.params.maaltijdId;

        //Log
        console.log('createDeelnemer was called. \r\n' +
                    "huisID:        " + huisID + "\r\n" +
                    "maaltijdID:    " + maaltijdID + "\r\n" + 
                    "- - - - - - - - - - - - - - - - - \r\n");
        
        //Geef een response terug
        response.status(200).end();
    },


    //Verkrijg een deelnemenr
    getDeelnemer(request, response, next){

        //verkrijg de meegegeven gegevens
        let huisID = request.params.huisId;
        let maaltijdID = request.params.maaltijdId;

        //Log
        console.log('getDeelnemer was called. \r\n' +
                    "huisID:        " + huisID + "\r\n" +
                    "maaltijdID:    " + maaltijdID + "\r\n" + 
                    "- - - - - - - - - - - - - - - - - \r\n");
        
        //Geef een response terug
        response.status(200).end();
    },


    //Verwijder een deelnemer
    deleteDeelnemer(request, response, next){

        //verkrijg de meegegeven gegevens
        let huisID = request.params.huisId;
        let maaltijdID = request.params.maaltijdId;

        //Log
        console.log('deleteDeelnemer was called. \r\n' +
                    "huisID:        " + huisID + "\r\n" +
                    "maaltijdID:    " + maaltijdID + "\r\n" + 
                    "- - - - - - - - - - - - - - - - - \r\n");
        
        //Geef een response terug
        response.status(200).end();
    }
};