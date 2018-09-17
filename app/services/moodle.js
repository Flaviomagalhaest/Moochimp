var request = require('request');
const tokenSufixUrl = '/login/token.php';
const restSufixUrl = '/webservice/rest/server.php';

exports.getToken = function(req, res, next) {
    let url = require('url');
    let query = url.parse(req.url, true).query;

    let username = query.username;
    let password = query.password;    
    let service = query.service;
    let moodleUrl = query.url + tokenSufixUrl;

    request.get(moodleUrl, function (error, response, body) {
        if (response.statusCode == 200) {
            res.json(JSON.parse(body).token);
        }
    }).qs({
        'username': username,
        'password': password,
        'service': service
    });       
}

exports.createUser = function(req, res, next) {
    let url = require('url');
    let query = url.parse(req.url, true).query;

    let moodleUrl = query.url + restSufixUrl;
    let token = query.token;
    let functionName = query.functionName;
    
    // let lista = []
    // let users = req.body[0];
    // lista.push(users)

    let users = req.body;

    request.post(moodleUrl, {json: {users: JSON.stringify(users)}}, function (error, response, body) {
        if (response.statusCode == 200) {
            res.json(JSON.parse(body).token);
        }
    }).qs({
        'wstoken': token,
        'wsfunction': functionName,
        'moodlewsrestformat': 'json'
    })
}

exports.teste = function(teste) {
    console.log("AEEEE");
}