"use strict";
const controller = require('../controller/moodleController');
const url = require('url');

exports.getToken = (req, res, next) => {
    const tokenSufixUrl = '/login/token.php';
    let query = url.parse(req.url, true).query;

    let user = query.username;
    let pass = query.password;    
    let service = query.service;
    let moodleUrl = query.url;

    controller.getToken(moodleUrl, user, pass, service)
    .then((data) => { res.json(data); })
    .catch((data) => { res.json(data); });
}

exports.createUser = (req, res, next) => {
    let query = url.parse(req.url, true).query;

    let moodleUrl = query.url;
    let token = query.token;
    let users = req.body;

    controller.createUser(moodleUrl, token, users)
    .then((data) => { res.json(data); })
    .catch((data) => { res.json(data); });
}

exports.getUsers = (req, res, next) => {
    let query = url.parse(req.url, true).query;

    let moodleUrl = query.url;
    let token = query.token;
    let criteria = req.body;

    controller.getUsers(moodleUrl, token, criteria)
    .then((data) => { res.json(data); })
    .catch((data) => { res.json(data); });
}

exports.enrolUser = (req, res, next) => {
    let query = url.parse(req.url, true).query;

    let moodleUrl = query.url;
    let token = query.token;
    let enrol = req.body;

    controller.enrolUser(moodleUrl, token, enrol)
    .then((data) => { res.json(data); })
    .catch((data) => { res.json(data); });
}