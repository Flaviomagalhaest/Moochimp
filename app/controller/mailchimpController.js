"use strict";
const listSufix = 'lists/';
const memberSufix = '/members'
const request = require('request');

exports.getTotalUsers = (url, token, listId, callback) => {
    let fields = 'stats.member_count,stats.unsubscribe_count,stats.cleaned_count';
    url = url + listSufix + listId;
    token = 'apikey ' + token;
    request.get(url, (error, response, body) => {
        callback(JSON.parse(body));
    }).qs({
        'fields': fields
    }).setHeader('Authorization',token);
}

exports.getInfoUsers = (params, listId, callback) => {
    let url = params['url'].concat(listSufix, listId, memberSufix)
    let token = 'apikey ' + params['token'];
    request.get(url, (error, response, body) => {
        callback(JSON.parse(body));
    }).qs({
        'count': params['count'],
        'offset': params['offset'],
        'fields': params['fields'],
        'exclude_fields': params['exclude_fields'],
        'since_timestamp_opt': params['since_timestamp_opt']
    }).setHeader('Authorization', token);
}