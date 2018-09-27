"use strict";
const listSufix = 'lists/';
const memberSufix = '/members'
const request = require('request');
const rp = require('request-promise-native');

exports.getTotalUsers = (url, token, listId) => {
		return new Promise((resolve, reject) => {
			let fields = 'stats.member_count,stats.unsubscribe_count,stats.cleaned_count';
			url = url + listSufix + listId;
			token = 'apikey ' + token;
			
			let options = {
				uri: url,
				qs: {
					'fields': fields
				}, headers: {
					'Authorization': token       
				},	json: true
			}
			rp(options)
			.then((response) => { resolve(response); })
			.catch((response) => { reject(response.error); });
		});
	}

exports.getInfoUsers = (params) => {
	return new Promise((resolve, reject) => {
		let url = params['url'].concat(listSufix, params['listId'], memberSufix)
		let token = 'apikey ' + params['token'];
		
		let options = {
			uri: url,
			qs: {
				'count': params['count'],
				'offset': params['offset'],
				'fields': params['fields'],
				'exclude_fields': params['exclude_fields'],
				'since_timestamp_opt': params['since_timestamp_opt']
			}, headers: {
				'Authorization': token       
			},	json: true
		}
		rp(options)
		.then((response) => { resolve(response.members); })
		.catch((response) => { reject(response.error); });
	});
}