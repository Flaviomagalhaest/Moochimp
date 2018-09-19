"use strict";
const tokenSufixUrl = '/login/token.php';
const restSufixUrl = '/webservice/rest/server.php';
const controller = require('../controller/moodleController');

exports.getToken = (req, res, next) => {
    let url = require('url');
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

exports.createUser = function(req, res, next) {
    let url = require('url');
    let query = url.parse(req.url, true).query;

    let moodleUrl = query.url + restSufixUrl;
    let token = query.token;
    let functionName = query.functionName;
    let format = 'json';
    let users = req.body;
    
    controller.createUser(moodleUrl, token, functionName, users,
        (ret) => {
            res.json(ret);
        }    
    );
}

exports.teste = function(teste) {
    console.log("AEEEE");
}