"use strict";
const rp = require('request-promise-native');
const tokenSufixUrl = 'login/token.php';
const restSufixUrl = 'webservice/rest/server.php';


const wsfunctionMoodle = {
	createUser: 'core_user_create_users',
	getUsers: 'core_user_get_users',
	enrolUser: 'enrol_manual_enrol_users'
}

exports.getToken = (url, user, pass, service) => {
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

exports.createUser = (url, token, users) => {
	url += restSufixUrl;
	return new Promise((resolve, reject) => {
		var options = {
			uri: url,
			method: 'POST',
			qs: {
				wstoken: token,
				wsfunction: wsfunctionMoodle.createUser,
				moodlewsrestformat: 'json'                
			},	form: {
				users: users
			},	json: true
		}
		rp(options)
		.then((response) => {
			if (response.errorcode || response.error) { reject(response); } 
			else { resolve(response); }
		});
	});
}

exports.getUsers = (url, token, criteria) => {
	url += restSufixUrl;
	return new Promise((resolve, reject) => {
		var options = {
			uri: url,
			method: 'POST',
			qs: {
				wstoken: token,
				wsfunction: wsfunctionMoodle.getUsers,
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

exports.enrolUser = (url, token, enrol) => {
	url += restSufixUrl;
	return new Promise((resolve, reject) => {
		var options = {
			uri: url,
			method: 'POST',
			qs: {
				wstoken: token,
				wsfunction: wsfunctionMoodle.enrolUser,
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