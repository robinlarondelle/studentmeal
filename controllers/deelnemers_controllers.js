/* 
 * Hier wordt beschreven hoe elke methode afgehandeld moet worden
 * 
 * Door Robin La Rondelle & Sjoerd Schepers
 * 
 */ 

//imports
let express = require('express');
let db = require('../config/database');
let error = require('../classes/error');
let assert = require('assert');

module.exports = {
    createDeelnemer(req, res, next) {
        let userId = '1';
        console.log('createDeelnemer was called, huisId=' + req.params.huisId + ', maaltijdId=' + req.params.maaltijdId);
        try {
            assert(isNaN(req.params.huisId) === false, 'huisId moet een nummer zijn');
            assert(req.params.huisId.indexOf('-') === -1, 'huisId kan niet negatief zijn');
            assert(req.params.huisId.indexOf('.') === -1, 'huisId kan geen decimaal getal zijn');
            assert(isNaN(req.params.maaltijdId) === false, 'maaltijdId must be anumber');
            assert(req.params.maaltijdId.indexOf('-') === -1, 'maaltijdId can\'t be negative');
            assert(req.params.maaltijdId.indexOf('.') === -1, 'maaltijdId can\'t be a decimal');
        } catch (e) {
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            return
        }

        //Validates wheter huisId exists or not
        let doesHuisIdExistQuery = {
            sql: 'SELECT * FROM `studentenhuis` WHERE studentenhuis.ID = \'' + req.params.huisId + '\'',
            timeout: 2000
        };
        db.query(doesHuisIdExistQuery, function (err, rows) {
            if (err) {
                res.status(400).json(err);
            } else if (rows[0] === undefined) {
                console.log('huisId does not exist');
                const ApiError = new error('huisId does not exist', 404);
                next(ApiError);
            } else {
                //Validates wheter maaltijdId exists or not
                let doesMaaltijdIdExistQuery = {
                    sql: 'SELECT * FROM `maaltijd` WHERE maaltijd.ID = \'' + req.params.maaltijdId + '\'\n',
                    timeout: 2000
                };
                db.query(doesMaaltijdIdExistQuery, function (err, rows) {
                    if (err) {
                        res.status(400).json(err);
                    } else if (rows[0] === undefined) {
                        console.log('maaltijdId does not exist');
                        const ApiError = new error('maaltijdId does not exist', 404);
                        next(ApiError);
                    } else {
                        //Bouwt query op
                        let query = {
                            sql: 'INSERT INTO deelnemers (`MaaltijdID`, `StudentenhuisID`, `UserID`) VALUES (\'' + req.params.maaltijdId + '\', \'' + req.params.huisId + '\', \'' + userId + '\')',
                            timeout: 2000
                        };
                        //Voert query uit
                        db.query(query, function (err, rows) {
                            if (err) {
                                if (err.errno === 1062) {
                                    const ApiError = new error('Dit account is al ingeschreven', 409);
                                    next(ApiError);
                                } else {
                                //Als de database een error gooit doe je dit
                                res.status(400).json(error);
                                }
                            } else {
                                let id = rows.insertId;

                                //Bouwt query op
                                let query = {
                                    sql: 'SELECT user.Voornaam, user.Achternaam, user.Email FROM user WHERE user.ID = ' + userId,
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
                });
            }
        });
    },
    getDeelnemer(req, res, next){
        console.log('getDeelnemer was called, huisId=' + req.params.huisId + ', maaltijdId=' + req.params.maaltijdId);
        try {
            assert(isNaN(req.params.huisId) === false, 'huisId moet een nummer zijn');
            assert(req.params.huisId.indexOf('-') === -1, 'huisId kan niet negatief zijn');
            assert(req.params.huisId.indexOf('.') === -1, 'huisId kan geen decimaal getal zijn');
            assert(isNaN(req.params.maaltijdId) === false, 'maaltijdId must be anumber');
            assert(req.params.maaltijdId.indexOf('-') === -1, 'maaltijdId can\'t be negative');
            assert(req.params.maaltijdId.indexOf('.') === -1, 'maaltijdId can\'t be a decimal');
        } catch (e) {
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            return
        }

        //Validates wheter huisId exists or not
        let doesHuisIdExistQuery = {
            sql : 'SELECT * FROM `deelnemers` WHERE deelnemers.StudentenhuisID = \'' + req.params.huisId + '\'',
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
                //Validates wheter maaltijdId exists or not
                let doesMaaltijdIdExistQuery = {
                    sql: 'SELECT * FROM `deelnemers` WHERE deelnemers.MaaltijdID = \'' + req.params.maaltijdId + '\'',
                    timeout: 2000
                };
                db.query(doesMaaltijdIdExistQuery, function (err, rows) {
                    if (err) {
                        res.status(400).json(err);
                    } else if (rows[0] === undefined) {
                        console.log('maaltijdId does not exist');
                        const ApiError = new error('maaltijdId does not exist', 404);
                        next(ApiError);
                    } else {
                        //Validates wheter the combination maaltijdId/deelnemerId exists or not
                        let doesCombinationExistQuery = {
                            sql: 'SELECT * FROM `deelnemers` WHERE deelnemers.MaaltijdID = \'' + req.params.maaltijdId + '\' AND deelnemers.StudentenhuisID = \'' + req.params.huisId + '\'',
                            timeout: 2000
                        };
                        db.query(doesCombinationExistQuery, function (err, rows) {
                            if (err) {
                                res.status(400).json(err);
                            } else if (rows[0] === undefined) {
                                console.log('Combination maaltijdId/deelnemerId does not exist');
                                const ApiError = new error('Combination maaltijdId/deelnemerId does not exist', 404);
                                next(ApiError);
                            } else {
                                //Bouwt query op
                                let query = {
                                    sql: 'SELECT user.Voornaam, user.Achternaam, user.Email FROM user JOIN deelnemers ON user.ID = deelnemers.UserID WHERE deelnemers.StudentenhuisID = ' + req.params.huisId + ' AND deelnemers.MaaltijdID = ' + req.params.maaltijdId,
                                    timeout: 2000
                                };

                                //Voert query uit
                                db.query(query, function (error, rows) {
                                    if (error) {
                                        //Als de database een error gooit doe je dit
                                        res.status(400).json(error);
                                    } else {
                                        //Alle resultaten van de query terugsturen
                                        res.status(200).json(rows);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    deleteDeelnemer(req, res, next){
        let userId = '1';

        console.log('deleteDeelnemer was called. huisId= ' + req.params.huisId + ', maaltijdId=' + req.params.maaltijdId);
        try {
            assert(isNaN(req.params.huisId) === false, 'huisId moet een nummer zijn');
            assert(req.params.huisId.indexOf('-') === -1, 'huisId kan niet negatief zijn');
            assert(req.params.huisId.indexOf('.') === -1, 'huisId kan geen decimaal getal zijn');
            assert(isNaN(req.params.maaltijdId) === false, 'maaltijdId must be anumber');
            assert(req.params.maaltijdId.indexOf('-') === -1, 'maaltijdId can\'t be negative');
            assert(req.params.maaltijdId.indexOf('.') === -1, 'maaltijdId can\'t be a decimal');
        } catch (e) {
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            return
        }

        //Validates wheter huisId exists or not
        let doesHuisIdExistQuery = {
            sql : 'SELECT * FROM `deelnemers` WHERE deelnemers.StudentenhuisID = \'' + req.params.huisId + '\'',
            timeout : 2000
        };
        db.query(doesHuisIdExistQuery, function(err, rows){
            if(err) {
                res.status(400).json(err);
            } else if (rows[0] === undefined){
                console.log('huisId does not exist');
                const ApiError = new error('huisId does not exist', 404);
                next(ApiError);
            } else {
                //Validates wheter maaltijdId exists or not
                let doesMaaltijdIdExistQuery = {
                    sql : 'SELECT * FROM `deelnemers` WHERE deelnemers.MaaltijdID = \'' + req.params.maaltijdId + '\'',
                    timeout : 2000
                };
                db.query(doesMaaltijdIdExistQuery, function(err, rows){
                    if(err) {
                        res.status(400).json(err);
                    } else if (rows[0] === undefined) {
                        console.log('maaltijdId does not exist');
                        const ApiError = new error('maaltijdId does not exist', 404);
                        next(ApiError);
                    } else {
                        //Validates wheter the combination maaltijdId/deelnemerId exists or not
                        let doesCombinationExistQuery = {
                            sql : 'SELECT * FROM `deelnemers` WHERE deelnemers.MaaltijdID = \'' + req.params.maaltijdId + '\' AND deelnemers.StudentenhuisID = \'' + req.params.huisId + '\'',
                            timeout : 2000
                        };
                        db.query(doesCombinationExistQuery, function(err, rows){
                            if(err) {
                                res.status(400).json(err);
                            } else if (rows[0] === undefined) {
                                console.log('Combination maaltijdId/deelnemerId does not exist');
                                const ApiError = new error('Combination maaltijdId/deelnemerId does not exist', 404);
                                next(ApiError);
                            } else {
                                //Validates wheter the user is the owner or not
                                let isUserOwnerQuery = {
                                    sql: 'SELECT * FROM `deelnemers` WHERE deelnemers.UserID = \'' + userId + '\' AND deelnemers.MaaltijdID = \'' + req.params.maaltijdId + '\' AND deelnemers.StudentenhuisID = \'' + req.params.huisId + '\'',
                                    timeout: 2000
                                };
                                db.query(isUserOwnerQuery, function (err, rows) {
                                    if (err) {
                                        res.status(400).json(err);
                                    } else if (rows[0] === undefined){
                                        console.log('User is not the owner');
                                        const ApiError = new error('Only the owner can change studentenhuizen', 401);
                                        next(ApiError);
                                    } else {
                                        //Bouwt query op
                                        let query = {
                                            sql : 'DELETE FROM deelnemers WHERE deelnemers.StudentenhuisID = \'' + req.params.huisId + '\' AND deelnemers.MaaltijdID = \'' + req.params.maaltijdId + '\' AND deelnemers.UserID = \'' + userId + '\'',
                                            timeout : 2000
                                        };

                                        db.query(query, function(error, rows){
                                            if(error) {
                                                //Als de database een error gooit doe je dit
                                                res.status(400).json(error);
                                            } else {
                                                let result = {
                                                    message : 'De deelnemer is succesvol verwijdert'
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
                });
            }
        });
    }
};