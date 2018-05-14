let express = require('express');

module.exports = {


    //Maak een nieuwe maaltijd aan
    createMaaltijd(request, response, next){

        //verkrijg de meegegeven gegevens
        let huisID = request.params.huisId;

        //Log
        console.log('createMaaltijd was called. \r\n' +
                    "huisID:        " + huisID + "\r\n" +
                    "- - - - - - - - - - - - - - - - - \r\n");
        
        //Geef een response terug
        response.status(200).end();
    },


    //Verkrijg een nieuwe maaltijd
    getMaaltijd(request, response, next){

        //verkrijg de meegegeven gegevens
        let huisID = request.params.huisId;

        //Log
        console.log('getMaaltijd was called. \r\n' +
                    "huisID:        " + huisID + "\r\n" +
                    "- - - - - - - - - - - - - - - - - \r\n");
        
        //Geef een response terug
        response.status(200).end();
    },


    //Verkrijg een nieuwe maaltijd met zijn ID
    getMaaltijdById(request, response, next){

        //verkrijg de meegegeven gegevens
        let huisID = request.params.huisId;
        let maaltijdID = request.params.maaltijdId;

        //Log
        console.log('getMaaltijdById was called. \r\n' +
                    "huisID:        " + huisID + "\r\n" +
                    "maaltijdID:    " + maaltijdID + "\r\n" +
                    "- - - - - - - - - - - - - - - - - \r\n");
        
        //Geef een response terug
        response.status(200).end();
    },


    //Geef een nieuwe maaltijd
    putMaaltijd(request, response, next){

        //verkrijg de meegegeven gegevens
        let huisID = request.params.huisId;
        let maaltijdID = request.params.maaltijdId;

        //Log
        console.log('putMaaltijd was called. \r\n' +
                    "huisID:        " + huisID + "\r\n" +
                    "maaltijdID:    " + maaltijdID + "\r\n" +
                    "- - - - - - - - - - - - - - - - - \r\n");
        
        //Geef een response terug
        response.status(200).end();
    },


    //Verwijder een maaltijd
    deleteMaaltijd(request, response, next){

        //verkrijg de meegegeven gegevens
        let huisID = request.params.huisId;
        let maaltijdID = request.params.maaltijdId;

        //Log
        console.log('deleteMaaltijd was called. \r\n' +
                    "huisID:        " + huisID + "\r\n" +
                    "maaltijdID:    " + maaltijdID + "\r\n" +
                    "- - - - - - - - - - - - - - - - - \r\n");
        
        //Geef een response terug
        response.status(200).end();
    }
};