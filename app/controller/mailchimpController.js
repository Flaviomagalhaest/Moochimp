"use strict";

var request = require('request');

exports.getTotalUsers = (url, token, fields, callback) => {
    request.get(url, (error, response, body) => {
        callback(JSON.parse(body));
    }).qs({
        'fields': fields
    }).setHeader('Authorization',token);
}

exports.getInfoUsers = (params, callback) => {
    request.get(params['url'], (error, response, body) => {
        callback(JSON.parse(body));
    }).qs({
        'count': params['count'],
        'offset': params['offset'],
        'fields': params['fields'],
        'exclude_fields': params['exclude_fields'],
        'since_timestamp_opt': params['since_timestamp_opt']
    }).setHeader('Authorization', params['token']);
}