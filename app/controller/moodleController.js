"use strict";

const tokenSufixUrl = '/login/token.php';
const restSufixUrl = '/webservice/rest/server.php';
const rp = require('request-promise-native');

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
		.then((response) => {
			if (response.errorcode) { reject(response); } 
			else { resolve(response.token); }
		});
    });
}

exports.createUser = (url, token, wsfunction, users, callback) => {
	return new Promise((resolve, reject) => {
		var options = {
			uri: url,
			method: 'POST',
			qs: {
				wstoken: token,
				wsfunction: wsfunction,
				moodlewsrestformat: 'json'                
			},	form: {
				users: users
			},	json: true
		}
		rp(options)
		.then((response) => {
			if (response.errorcode) { reject(response); } 
			else { resolve(response.body); }
		});
	});
}

exports.getUsers = (url, token, wsfunction, criteria, callback) => {
	return new Promise((resolve, reject) => {
		var options = {
			uri: url,
			method: 'POST',
			qs: {
				wstoken: token,
				wsfunction: wsfunction,
				moodlewsrestformat: 'json'                
			},	form: {
				criteria: criteria
			},	json: true 
		}
		rp(options)
		.then((response) => {
			if (response.errorcode) { reject(response); } 
			else { resolve(response); }
		});
	});
}

exports.enrolUser = (url, token, wsfunction, enrol, callback) => {
	return new Promise((resolve, reject) => {
		var options = {
			uri: url,
			method: 'POST',
			qs: {
				wstoken: token,
				wsfunction: wsfunction,
				moodlewsrestformat: 'json'                
			},	form: {
				enrolments: enrol
			},	json: true 
		}
		rp(options)
		.then((response) => {
			if (response && response.errorcode) {
				 reject(response); } 
			else { resolve(response); }
		});
	});
}