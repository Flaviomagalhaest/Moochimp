"use strict";
const restSufixUrl = '/webservice/rest/server.php';
const controller = require('../controller/moodleController');
const url = require('url');

exports.getToken = (req, res, next) => {
    const tokenSufixUrl = '/login/token.php';
    let query = url.parse(req.url, true).query;

    let user = query.username;
    let pass = query.password;    
    let service = query.service;
    let moodleUrl = query.url + tokenSufixUrl;

    controller.getToken(moodleUrl, user, pass, service, 
        (ret) => {
            res.json(ret);
        }
    );     
}

exports.createUser = (req, res, next) => {
    let query = url.parse(req.url, true).query;

    let moodleUrl = query.url + restSufixUrl;
    let token = query.token;
    let functionName = query.functionName;
    let users = req.body;
    
    controller.createUser(moodleUrl, token, functionName, users,
        (ret) => {
            res.json(ret);
        }    
    );
}

exports.getUsers = (req, res, next) => {
    let query = url.parse(req.url, true).query;

    let moodleUrl = query.url + restSufixUrl;
    let token = query.token;
    let functionName = query.functionName;
    let criteria = req.body;

    controller.getUsers(moodleUrl, token, functionName, criteria,
        (ret) => {
            res.json(ret);
        }    
    );
}

exports.teste = function(teste) {
    console.log("AEEEE");
}