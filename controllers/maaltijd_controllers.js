let express = require('express');

module.exports = {
    createMaaltijd(req, res, next){
        console.log('createMaaltijd(req, res, next) was called, huisId=' + req.params.huisId);
        res.status(200).end();
    },
    getMaaltijd(req, res, next){
        console.log('getMaaltijd(req, res, next) was called, huisId=' + req.params.huisId);
        res.status(200).end();
    },
    getMaaltijdById(req, res, next){
        console.log('getMaaltijdById(req, res, next) was called, huisId=' + req.params.huisId + ', maaltijdId=' + req.params.maaltijdId);
        res.status(200).end();
    },
    putMaaltijd(req, res, next){
        console.log('putMaaltijd(req, res, next) was called, huisId=' + req.params.huisId + ', maaltijdId=' + req.params.maaltijdId);
        res.status(200).end();
    },
    deleteMaaltijd(req, res, next){
        console.log('putMaaltijd(req, res, next) was called, huisId=' + req.params.huisId + ', maaltijdId=' + req.params.maaltijdId);
        res.status(200).end();
    }
};