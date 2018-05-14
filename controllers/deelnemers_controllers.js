let express = require('express');

module.exports = {
    createDeelnemer(req, res, next){
        console.log('createDeelnemer(req, res, next) was called, huisId=' + req.params.huisId + ', maaltijdId=' + req.params.maaltijdId);
        res.status(200).end();
    },
    getDeelnemer(req, res, next){
        console.log('getDeelnemer(req, res, next) was called, huisId=' + req.params.huisId + ', maaltijdId=' + req.params.maaltijdId);
        res.status(200).end();
    },
    deleteDeelnemer(req, res, next){
        console.log('deleteDeelnemer(req, res, next) was called, huisId=' + req.params.huisId + ', maaltijdId=' + req.params.maaltijdId);
        res.status(200).end();
    }
};