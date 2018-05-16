let express = require('express');
let db = require('../config/database');
let studentenhuis = require('../classes/studentenhuis');
let assert = require('assert');
let error = require('../classes/error');

/*STUDENTENHUIS TO-DO
Tests toevoegen
 */

module.exports = {
     createStudentenhuis(req, res, next){
        auth.decodeToken(req.headers['authorization'], (error, payload) => {
            if(error)   {
                const noValidTokenError = new ApiError("Not a valid token", 401);
                response.status(401).json(noValidTokenError);
            } else {
                userId = payload.sub;
            }
        });

        console.log("userId: " + userId);

         console.log('createStudentenhuis was called, naam=' + req.body.naam + ', adres=' + req.body.adres);
         let huis = new studentenhuis(req.body.naam, req.body.adres, userId, next);
         if (!huis.error){
             //Bouwt query op
             let query = {
                 sql: 'INSERT INTO `studentenhuis` (`Adres`, `Naam`, `UserID`) VALUES (\'' + huis.adres + '\', \'' + huis.naam + '\', \'' + huis.userId + '\');',
                 timeout: 2000
             };

             //Voert query uit
             db.query(query, function (error, rows) {
                 if (error) {
                     //Als de database een error gooit doe je dit
                     res.status(400).json(error);
                 } else {
                     let id = rows.insertId;

                     //Bouwt query op
                     let query = {
                         sql: 'SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, CONCAT(user.Voornaam, \' \', user.Achternaam) AS Contact, user.Email FROM `studentenhuis` JOIN user ON user.ID = studentenhuis.UserID WHERE studentenhuis.ID = ' + id,
                         timeout: 2000
                     };

                     //Voert query uit
                     db.query(query, function (error, rows) {
                         if (error) {
                             //Als de database een error gooit doe je dit
                             res.status(400).json(error);
                         } else {
                             //Alle resultaten van de query terugsturen
                             res.status(200).json(rows[0]);
                         }
                     });
                 }
             });
         }
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
         let userId = '1';
        console.log('getStudentenhuis was called. huisId= ' + req.params.huisId);
        //Validate huisId value
        try {
            assert(isNaN(req.params.huisId) === false, 'huisId moet een nummer zijn');
            assert(req.params.huisId.indexOf('-') === -1, 'huisId kan niet negatief zijn');
            assert(req.params.huisId.indexOf('.') === -1, 'huisId kan geen decimaal getal zijn');
        } catch (e){
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
        }

        //Validates wheter huisId exists or not
        let doesHuisIdExistQuery = {
            sql : 'SELECT * FROM `studentenhuis` WHERE studentenhuis.ID = \'' + req.params.huisId + '\'',
            timeout : 2000
        };
        db.query(doesHuisIdExistQuery, function(err, rows) {
            if (err) {
                res.status(400).json(err);
            } else if (rows[0] === undefined) {
                console.log('huisId does not exist');
                const ApiError = new error('huisId does not exist', 404);
                next(ApiError);
            } else {
                //Bouwt query op
                let query = {
                    sql: 'SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, CONCAT(user.Voornaam, \' \', user.Achternaam) AS Contact, user.Email FROM `studentenhuis` JOIN user ON user.ID = studentenhuis.UserID WHERE studentenhuis.ID = ' + req.params.huisId,
                    timeout: 2000
                };
                //Voert query uit
                db.query(query, function (error, rows) {
                    if (error) {
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
    putStudentenhuis(req, res, next){
         let allowed = true;
         auth.decodeToken(req.headers['authorization'], (error, payload) => {
            if(error)   {
                const noValidTokenError = new ApiError("Not a valid token", 401);
                response.status(401).json(noValidTokenError);
            } else {
                userId = payload.sub;
            }
        });

        console.log("userId: " + userId);
         console.log('putStudentenhuis was called. huisId= ' + req.params.huisId + 'naam=' + req.body.naam + ', adres=' + req.body.adres);

        //Validate huisId value
        try {
            assert(isNaN(req.params.huisId) === false, 'huisId moet een nummer zijn');
            assert(req.params.huisId.indexOf('-') === -1, 'huisId kan niet negatief zijn');
            assert(req.params.huisId.indexOf('.') === -1, 'huisId kan geen decimaal getal zijn');
        } catch (e){
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            allowed = false;
            return
        }

        //Validates wheter huisId exists or not
        let doesHuisIdExistQuery = {
            sql : 'SELECT * FROM `studentenhuis` WHERE studentenhuis.ID = \'' + req.params.huisId + '\'',
            timeout : 2000
        };
        db.query(doesHuisIdExistQuery, function(err, rows) {
            if (err) {
                res.status(400).json(err);
            } else if (rows[0] === undefined) {
                console.log('huisId does not exist');
                const ApiError = new error('huisId does not exist', 404);
                next(ApiError);
            } else {
                //Validates wheter the user is the owner or not
                let isUserOwnerQuery = {
                    sql: 'SELECT * FROM `studentenhuis` WHERE studentenhuis.UserID = \'' + userId + '\' AND studentenhuis.ID = \'' + req.params.huisId + '\'',
                    timeout: 2000
                };
                db.query(isUserOwnerQuery, function (err, rows) {
                    if (err) {
                        res.status(400).json(err);
                    } else if (rows[0] === undefined) {
                        console.log('User is not the owner');
                        const ApiError = new error('Only the owner can change studentenhuizen', 401);
                        next(ApiError);
                    } else {
                        let huis = new studentenhuis(req.body.naam, req.body.adres, userId, next);
                        if (!huis.error) {
                            //Bouwt query op
                            let query = {
                                sql: 'UPDATE studentenhuis SET studentenhuis.Naam = \'' + huis.naam + '\', studentenhuis.Adres = \'' + huis.adres + '\' WHERE studentenhuis.ID = \'' + req.params.huisId + '\' AND studentenhuis.UserID = ' + huis.userId,
                                timeout: 2000
                            };
                            console.log(query.sql);

                            //Voert query uit
                            db.query(query, function (error, rows) {
                                if (error) {
                                    //Als de database een error gooit doe je dit
                                    res.status(400).json(error);
                                } else {
                                    //Bouwt query op
                                    let query = {
                                        sql: 'SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, CONCAT(user.Voornaam, \' \', user.Achternaam) AS Contact, user.Email FROM `studentenhuis` JOIN user ON user.ID = studentenhuis.UserID WHERE studentenhuis.ID = ' + req.params.huisId,
                                        timeout: 2000
                                    };

                                    //Voert query uit
                                    db.query(query, function (error, rows) {
                                        if (error) {
                                            if (error.errno === 1062) {
                                                const ApiError = new error('Je mag deze informatie niet bewerken', 409);
                                                next(ApiError);
                                            } else {
                                                //Als de database een error gooit doe je dit
                                                res.status(400).json(error);
                                            }
                                        } else {
                                            //Alle resultaten van de query terugsturen
                                            res.status(200).json(rows[0]);
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
    },
    deleteStudentenhuis(req, res, next){
        auth.decodeToken(req.headers['authorization'], (error, payload) => {
            if(error)   {
                const noValidTokenError = new ApiError("Not a valid token", 401);
                response.status(401).json(noValidTokenError);
            } else {
                userId = payload.sub;
            }
        });

        console.log("userId: " + userId);

        console.log('deleteStudentenhuis was called. huisId= ' + req.params.huisId);
        try {
            assert(isNaN(req.params.huisId) === false, 'huisId moet een nummer zijn');
            assert(req.params.huisId.indexOf('-') === -1, 'huisId kan niet negatief zijn');
            assert(req.params.huisId.indexOf('.') === -1, 'huisId kan geen decimaal getal zijn');
        } catch (e){
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            return
        }

        //Validates wheter huisId exists or not
        let doesHuisIdExistQuery = {
            sql : 'SELECT * FROM `studentenhuis` WHERE studentenhuis.ID = \'' + req.params.huisId + '\'',
            timeout : 2000
        };
        db.query(doesHuisIdExistQuery, function(err, rows) {
            if (err) {
                res.status(400).json(err);
            } else if (rows[0] === undefined) {
                console.log('huisId does not exist');
                const ApiError = new error('huisId does not exist', 404);
                next(ApiError);
            } else {
                //Validates wheter the user is the owner or not
                let isUserOwnerQuery = {
                    sql: 'SELECT * FROM `studentenhuis` WHERE studentenhuis.UserID = \'' + userId + '\' AND studentenhuis.ID = \'' + req.params.huisId,
                    timeout: 2000
                };
                db.query(isUserOwnerQuery, function (err, rows) {
                    if (err) {
                        res.status(400).json(err);
                    } else if (rows[0] === undefined) {
                        console.log('User is not the owner');
                        const ApiError = new error('Only the owner can change studentenhuizen', 401);
                        next(ApiError);
                    } else {
                        //Bouwt query op
                        let query = {
                            sql: 'DELETE FROM studentenhuis WHERE studentenhuis.ID = ' + req.params.huisId,
                            timeout: 2000
                        };

                        db.query(query, function (error, rows) {
                            if (error) {
                                if (error.errno === 1062) {
                                    const ApiError = new error('Je mag deze data niet verwijderen', 409);
                                    next(ApiError);
                                } else {
                                    //Als de database een error gooit doe je dit
                                    res.status(400).json(error);
                                }
                            } else {
                                let result = {
                                    message: 'Het studentenhuis is succesvol verwijdert'
                                };
                                //Terugsturen dat het gelukt is
                                res.status(200).json(result);
                            }
                        });
                    }
                });
            }
        });
    }
};