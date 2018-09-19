"use strict";

const tokenSufixUrl = '/login/token.php';
const restSufixUrl = '/webservice/rest/server.php';

var request = require('request');

exports.getToken = (url, user, pass, service, callback) => {
    request.get(url, (error, response, body) => {
            callback(JSON.parse(body).token);
    }).qs({
        'username': user,
        'password': pass,
        'service': service
    });
}

exports.createUser = (url, token, wsfunction, users, callback) => {
    request.post(url, (error, response, body) => {
        callback(JSON.parse(response.body));
    }).qs({
        'wstoken': token,
        'wsfunction': wsfunction,
        'moodlewsrestformat': 'json'
    }).form({users: users});
}