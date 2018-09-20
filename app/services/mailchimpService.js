"use strict";
const controller = require('../controller/mailchimpController');
const url = require('url');

exports.getTotalUsers = (req, res, next) => {
    const listSufix = 'lists/';
    let query = url.parse(req.url, true).query;

    let mailchimpUrl = query.url + listSufix + query.listId;
    let token = 'apikey ' + query.token;
    let fields = 'stats.member_count,stats.unsubscribe_count,stats.cleaned_count';

    controller.getTotalUsers(mailchimpUrl, token, fields, 
        (ret) => {
            res.json(ret);
        }
    );
}

exports.getInfoUsers = (req, res, next) => {
    const listSufix = 'lists/';
    const memberSufix = '/members'
    let query = url.parse(req.url, true).query;
    
    let params = {
        url: query.url.concat(listSufix, query.listId, memberSufix),
        token: 'apikey ' + query.token,
        count: query.count,
        offset: query.offset,
        fields: req.body.fields,
        exclude_fields: req.body.exclude_fields,
        since_timestamp_opt: query.since_timestamp_opt
    }
    var a = 1;
    // controller.getInfoUsers(params, 
    //     (ret) => {
    //         res.json(ret);
    //     }
    // );
}