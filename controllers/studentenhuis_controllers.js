let express = require('express');
let db = require('../config/database');

/*STUDENTENHUIS TO-DO
ID vervangen door de informatie uit de payload bij putStudentenhuis
Asserts toevoegen voor stabiliteit
Errors veranderen dmv eigen error klasse
Tests toevoegen
 */

module.exports = {
    createStudentenhuis(req, res, next){
        console.log('createStudentenhuis was called, naam=' + req.body.naam + ', adres=' + req.body.adres);
        //Bouwt query op
        let query = {
            sql : 'INSERT INTO `studentenhuis` (`Adres`, `Naam`, `UserID`) VALUES (\'' + req.body.adres + '\', \'' + req.body.naam + '\', \'' + req.body.id + '\');',
            timeout : 2000
        };

        //Voert query uit
        db.query(query, function(error, rows){
            if(error) {
                //Als de database een error gooit doe je dit
                res.status(400).json(error);
            } else {
                let id = rows.insertId;

                //Bouwt query op
                let query = {
                    sql: 'SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, CONCAT(user.Voornaam, \' \', user.Achternaam) AS Contact, user.Email FROM `studentenhuis` JOIN user ON user.ID = studentenhuis.UserID WHERE studentenhuis.ID = ' + id,
                    timeout : 2000
                };

                //Voert query uit
                db.query(query, function(error, rows){
                    if(error) {
                        //Als de database een error gooit doe je dit
                        res.status(400).json(error);
                    } else {
                        //Alle resultaten van de query terugsturen
                        res.status(200).json(rows[0]);
                    }
                });
            }
        });
    },
    getStudentenhuis(req, res, next){
        console.log('getStudentenhuis was called');
        //Bouwt query op
        let query = {
            sql : 'SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, CONCAT(user.Voornaam, \' \', user.Achternaam) AS Contact, user.Email FROM `studentenhuis` RIGHT JOIN user ON user.ID = studentenhuis.UserID',
            timeout : 2000
        };

        //Voert query uit
        db.query(query, function(error, rows){
           if(error) {
               //Als de database een error gooit doe je dit
               res.status(400).json(error);
           } else {
               //Alle resultaten van de query terugsturen
               res.status(200).json(rows);
           }
        });
    },
    getStudentenhuisById(req, res, next){
        console.log('getStudentenhuis was called. huisId= ' + req.params.huisId);
        //Bouwt query op
        let query = {
            sql : 'SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, CONCAT(user.Voornaam, \' \', user.Achternaam) AS Contact, user.Email FROM `studentenhuis` JOIN user ON user.ID = studentenhuis.UserID WHERE studentenhuis.ID = 1',
            timeout : 2000
        };

        //Voert query uit
        db.query(query, function(error, rows){
            if(error) {
                //Als de database een error gooit doe je dit
                res.status(400).json(error);
            } else {
                //Alle resultaten van de query terugsturen
                res.status(200).json(rows);
            }
        });
    },
    putStudentenhuis(req, res, next){
        console.log('putStudentenhuis was called. huisId= ' + req.params.huisId + 'naam=' + req.body.naam + ', adres=' +req.body.adres);
        //Bouwt query op
        let query = {
            sql : 'UPDATE studentenhuis SET studentenhuis.Naam = \'' + req.body.naam + '\', studentenhuis.Adres = \'' + req.body.adres + '\' WHERE studentenhuis.ID = \'' + req.params.huisId + '\' AND studentenhuis.UserID = \'1\'',
            timeout : 2000
        };

        //Voert query uit
        db.query(query, function(error, rows){
            if(error) {
                //Als de database een error gooit doe je dit
                res.status(400).json(error);
            } else {
                //Bouwt query op
                let query = {
                    sql: 'SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, CONCAT(user.Voornaam, \' \', user.Achternaam) AS Contact, user.Email FROM `studentenhuis` JOIN user ON user.ID = studentenhuis.UserID WHERE studentenhuis.ID = ' + req.params.huisId,
                    timeout : 2000
                };

                //Voert query uit
                db.query(query, function(error, rows){
                    if(error) {
                        //Als de database een error gooit doe je dit
                        res.status(400).json(error);
                    } else {
                        //Alle resultaten van de query terugsturen
                        res.status(200).json(rows[0]);
                    }
                });
            }
        });
    },
    deleteStudentenhuis(req, res, next){
        console.log('deleteStudentenhuis was called. huisId= ' + req.params.huisId);
        //Bouwt query op
        let query = {
            sql : 'DELETE FROM studentenhuis WHERE studentenhuis.ID = ' + req.params.huisId,
            timeout : 2000
        };

        db.query(query, function(error, rows){
           if(error) {
               //Als de database een error gooit doe je dit
               res.status(400).json(error);
           } else {
               let result = {
                   message : 'Het studentenhuis is succesvol verwijdert'
               };
               //Terugsturen dat het gelukt is
               res.status(200).json(result);
           }
        });
    }
};