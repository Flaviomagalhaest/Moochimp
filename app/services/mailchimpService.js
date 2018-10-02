"use strict";
const controller = require('../controller/mailchimpController');
const url = require('url');

exports.getTotalUsers = (req, res, next) => {
    let query = url.parse(req.url, true).query;

    let mailchimpUrl = query.url;
    let token = query.token;
    controller.getTotalUsers(mailchimpUrl, token, query.listId)
    .then((data) => { res.json(data); })
    .catch((data) => { res.json(data); });
}

exports.getInfoUsers = (req, res, next) => {
    let query = url.parse(req.url, true).query;
    
    let params = {
        url: query.url,
        token: query.token,
        listId: query.listId,
        count: query.count,
        offset: query.offset,
        fields: query.fields,
        exclude_fields: query.exclude_fields,
        since_timestamp_opt: query.since_timestamp_opt
    }
    controller.getInfoUsers(params)
    .then((data) => { res.json(data); })
    .catch((data) => { res.json(data); });
}