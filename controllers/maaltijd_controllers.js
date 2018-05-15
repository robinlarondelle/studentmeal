let express = require('express');
let maaltijd = require('../classes/maaltijd');
let db = require('../config/database');
let error = require('../classes/error');
let assert = require('assert');

module.exports = {
    createMaaltijd(req, res, next){
        let userId = '1';
        console.log('createMaaltijd was called, huisId=' + req.params.huisId);

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
                let maal = new maaltijd(req.body.naam, req.body.beschrijving, req.body.ingredienten, req.body.allergie, req.body.prijs, req.params.huisId, userId, next);
                if (!maal.error) {
                    //Bouwt query op
                    let query = {
                        sql: 'INSERT INTO maaltijd (`Naam`, `Beschrijving`, `Ingredienten`, `Allergie`, `Prijs`, `StudentenhuisID`, `UserId`) VALUES (\'' + maal.naam + '\', \'' + maal.beschrijving + '\', \'' + maal.ingredienten + '\', \'' + maal.allergie + '\', \'' + maal.prijs + '\', \'' + maal.huisId + '\', \'' + maal.userId + '\')',
                        timeout: 2000
                    };
                    console.log(query.sql);

                    //Voert query uit
                    db.query(query, function (error, rows) {
                        if (error) {
                            //Als de database een error gooit doe je dit
                            res.status(400).json(error);
                        } else {
                            let id = rows.insertId;

                            //Bouwt query op
                            let query = {
                                sql: 'SELECT maaltijd.ID, maaltijd.Beschrijving, maaltijd.Ingredienten, maaltijd.Allergie, maaltijd.Prijs FROM maaltijd WHERE maaltijd.ID = ' + id,
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
            }
        });
    },
    getMaaltijd(req, res, next){
        console.log('getMaaltijd was called, huisId=' + req.params.huisId);

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
            sql : 'SELECT * FROM `maaltijd` WHERE maaltijd.StudentenhuisID = \'' + req.params.huisId + '\'',
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
                    sql: 'SELECT maaltijd.ID, maaltijd.Naam, maaltijd.Beschrijving, maaltijd.Ingredienten, maaltijd.Allergie, maaltijd.Prijs FROM maaltijd WHERE maaltijd.StudentenhuisID =' + req.params.huisId,
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
    },
    getMaaltijdById(req, res, next){
        console.log('getMaaltijdById(req, res, next) was called, huisId=' + req.params.huisId + ', maaltijdId=' + req.params.maaltijdId);

        try {
            assert(isNaN(req.params.huisId) === false, 'huisId moet een nummer zijn');
            assert(req.params.huisId.indexOf('-') === -1, 'huisId kan niet negatief zijn');
            assert(req.params.huisId.indexOf('.') === -1, 'huisId kan geen decimaal getal zijn');
            assert(isNaN(req.params.maaltijdId) === false, 'maaltijdId must be anumber');
            assert(req.params.maaltijdId.indexOf('-') === -1, 'maaltijdId can\'t be negative');
            assert(req.params.maaltijdId.indexOf('.') === -1, 'maaltijdId can\'t be a decimal');
        } catch (e){
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            return
        }
        //Validates wheter huisId exists or not
        let doesHuisIdExistQuery = {
            sql : 'SELECT * FROM `maaltijd` WHERE maaltijd.StudentenhuisID = \'' + req.params.huisId + '\'',
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
                    sql: 'SELECT * FROM `maaltijd` WHERE maaltijd.ID = \'' + req.params.maaltijdId + '\'',
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
                            sql: 'SELECT * FROM `maaltijd` WHERE maaltijd.ID = \'' + req.params.maaltijdId + '\' AND maaltijd.StudentenhuisID = \'' + req.params.huisId + '\'',
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
                                    sql: 'SELECT maaltijd.ID, maaltijd.Naam, maaltijd.Beschrijving, maaltijd.Ingredienten, maaltijd.Allergie, maaltijd.Prijs FROM maaltijd WHERE maaltijd.StudentenhuisID = ' + req.params.huisId + ' AND maaltijd.ID = ' + req.params.maaltijdId,
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
    putMaaltijd(req, res, next){
        let userId = '1';
        console.log('putMaaltijd was called, huisId=' + req.params.huisId + ', maaltijdId=' + req.params.maaltijdId);

        try {
            assert(isNaN(req.params.huisId) === false, 'huisId moet een nummer zijn');
            assert(req.params.huisId.indexOf('-') === -1, 'huisId kan niet negatief zijn');
            assert(req.params.huisId.indexOf('.') === -1, 'huisId kan geen decimaal getal zijn');
            assert(isNaN(req.params.maaltijdId) === false, 'maaltijdId must be anumber');
            assert(req.params.maaltijdId.indexOf('-') === -1, 'maaltijdId can\'t be negative');
            assert(req.params.maaltijdId.indexOf('.') === -1, 'maaltijdId can\'t be a decimal');
        } catch (e){
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            return
        }

        //Validates wheter huisId exists or not
        let doesHuisIdExistQuery = {
            sql : 'SELECT * FROM `maaltijd` WHERE maaltijd.StudentenhuisID = \'' + req.params.huisId + '\'',
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
                    sql: 'SELECT * FROM `maaltijd` WHERE maaltijd.ID = \'' + req.params.maaltijdId + '\'',
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
                            sql: 'SELECT * FROM `maaltijd` WHERE maaltijd.ID = \'' + req.params.maaltijdId + '\' AND maaltijd.StudentenhuisID = \'' + req.params.huisId + '\'',
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
                                //Validates wheter the user is the owner or not
                                let isUserOwnerQuery = {
                                    sql: 'SELECT * FROM `maaltijd` WHERE maaltijd.UserID = \'' + userId + '\' AND maaltijd.ID = \'' + req.params.maaltijdId + '\' AND maaltijd.StudentenhuisID = \'' + req.params.huisId + '\'',
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
                                        let maal = new maaltijd(req.body.naam, req.body.beschrijving, req.body.ingredienten, req.body.allergie, req.body.prijs, req.params.huisId, userId, next);
                                        if (!maal.error) {
                                            //Bouwt query op
                                            let query = {
                                                sql: 'UPDATE maaltijd SET maaltijd.Naam = \'' + maal.naam + '\', maaltijd.Beschrijving = \'' + maal.beschrijving + '\', maaltijd.Ingredienten = \'' + maal.ingredienten + '\', maaltijd.Allergie = \'' + maal.allergie + '\', maaltijd.Prijs = \'' + maal.prijs + '\' WHERE maaltijd.StudentenhuisID = \'' + req.params.huisId + '\' AND maaltijd.ID = \'' + req.params.maaltijdId + '\'',
                                                timeout: 2000
                                            };
                                            //Voert query uit
                                            db.query(query, function (error, rows) {
                                                if (error) {
                                                    if (error.errno === 1062) {
                                                        const ApiError = new error('Je mag deze informatie niet veranderen', 409);
                                                        next(ApiError);
                                                    } else {
                                                        //Als de database een error gooit doe je dit
                                                        res.status(400).json(error);
                                                    }
                                                } else {
                                                    //Bouwt query op
                                                    let query = {
                                                        sql: 'SELECT maaltijd.ID, maaltijd.Beschrijving, maaltijd.Ingredienten, maaltijd.Allergie, maaltijd.Prijs FROM maaltijd WHERE maaltijd.ID = ' + req.params.maaltijdId,
                                                        timeout: 2000
                                                    };

                                                    //Voert query uit
                                                    console.log(query.sql);
                                                    db.query(query, function (error, rows) {
                                                        if (error) {
                                                            console.log('Error tweede query');
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
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    deleteMaaltijd(req, res, next){
        let userId = '1';

        console.log('putMaaltijd(req, res, next) was called, huisId=' + req.params.huisId + ', maaltijdId=' + req.params.maaltijdId);
        try {
            assert(isNaN(req.params.huisId) === false, 'huisId moet een nummer zijn');
            assert(req.params.huisId.indexOf('-') === -1, 'huisId kan niet negatief zijn');
            assert(req.params.huisId.indexOf('.') === -1, 'huisId kan geen decimaal getal zijn');
            assert(isNaN(req.params.maaltijdId) === false, 'maaltijdId must be anumber');
            assert(req.params.maaltijdId.indexOf('-') === -1, 'maaltijdId can\'t be negative');
            assert(req.params.maaltijdId.indexOf('.') === -1, 'maaltijdId can\'t be a decimal');
        } catch (e){
            const ApiError = new error(e.toString(), 412);
            next(ApiError);
            return
        }

        //Validates wheter huisId exists or not
        let doesHuisIdExistQuery = {
            sql : 'SELECT * FROM `maaltijd` WHERE maaltijd.StudentenhuisID = \'' + req.params.huisId + '\'',
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
                    sql: 'SELECT * FROM `maaltijd` WHERE maaltijd.ID = \'' + req.params.maaltijdId + '\'',
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
                            sql: 'SELECT * FROM `maaltijd` WHERE maaltijd.ID = \'' + req.params.maaltijdId + '\' AND maaltijd.StudentenhuisID = \'' + req.params.huisId + '\'',
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
                                //Validates wheter the user is the owner or not
                                let isUserOwnerQuery = {
                                    sql: 'SELECT * FROM `maaltijd` WHERE maaltijd.UserID = \'' + userId + '\' AND maaltijd.ID = \'' + req.params.maaltijdId + '\' AND maaltijd.StudentenhuisID = \'' + req.params.huisId + '\'',
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
                                            sql: 'DELETE FROM maaltijd WHERE maaltijd.ID = ' + req.params.maaltijdId,
                                            timeout: 2000
                                        };

                                        db.query(query, function (error, rows) {
                                            if (error) {
                                                if (error.errno === 1062) {
                                                    const ApiError = new error('Je mag deze informatie niet verwijderen', 409);
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
                });
            }
        });
    }
};