let express = require('express');

module.exports = {
    createStudentenhuis(req, res, next){
        console.log('createStudentenhuis(req, res, next) was called');
        res.status(200).end();
    },
    getStudentenhuis(req, res, next){
        console.log('getStudentenhuis(req, res, next) was called');
        res.status(200).end();
    },
    getStudentenhuisById(req, res, next){
        console.log('getStudentenhuis(req, res, next) was called. huisId= ' + req.params.huisId);
        res.status(200).end();
    },
    putStudentenhuis(req, res, next){
        console.log('putStudentenhuis(req, res, next) was called. huisId= ' + req.params.huisId);
        res.status(200).end();
    },
    deleteStudentenhuis(req, res, next){
        console.log('deleteStudentenhuis(req, res, next) was called. huisId= ' + req.params.huisId);
        res.status(200).end();
    }
};