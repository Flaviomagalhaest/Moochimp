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