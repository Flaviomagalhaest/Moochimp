"use strict";

var request = require('request');

exports.getTotalUsers = (url, token, fields, callback) => {
    request.get(url, (error, response, body) => {
        callback(JSON.parse(body));
    }).qs({
        'fields': fields
    }).setHeader('Authorization',token);
}