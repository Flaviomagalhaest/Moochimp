"use strict";

const tokenSufixUrl = '/login/token.php';
const restSufixUrl = '/webservice/rest/server.php';
const rp = require('request-promise-native');
const request = require('request');

exports.getToken = (url, user, pass, service, callback) => {
    return new Promise((resolve) => {
        var options = {
            uri: url,
            qs: {
                'username': user,
                'password': pass,
                'service': service
            },
            json: true
        }
        rp(options)
        .then((response) => { resolve(response.token); });
    });
}

exports.createUser = (url, token, wsfunction, userss, callback) => {
	return new Promise((resolve) => {
		var options = {
			uri: url,
			method: 'POST',
			qs: {
				wstoken: token,
				wsfunction: wsfunction,
				moodlewsrestformat: 'json'                
			},	form: {
				users: userss
			},	json: true
		}
		rp(options)
		.then((response) => {
			 resolve(response.body); 
		});
	});
    // request.post(url, (error, response, body) => {
    //     callback(JSON.parse(response.body));
    // }).qs({
    //     'wstoken': token,
    //     'wsfunction': wsfunction,
    //     'moodlewsrestformat': 'json'
    // }).form({users: users});
}

exports.getUsers = (url, token, wsfunction, criteria, callback) => {
    request.post(url, (error, response, body) => {
        callback(JSON.parse(response.body));
    }).qs({
        'wstoken': token,
        'wsfunction': wsfunction,
        'moodlewsrestformat': 'json'
    }).form({criteria: criteria});
}

exports.enrolUser = (url, token, wsfunction, enrol, callback) => {
    request.post(url, (error, response, body) => {
        callback(JSON.parse(response.body));
    }).qs({
        'wstoken': token,
        'wsfunction': wsfunction,
        'moodlewsrestformat': 'json'
    }).form({enrolments: enrol});
}