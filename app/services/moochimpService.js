"use strict";
const url = require('url');
const controller = require('../controller/moochimpController');

exports.createUser = (req, res, next) => {
	let query = url.parse(req.url, true).query;
	
	let param = {
		mailchimp: {
			url: query.mailchimpUrl,
			listId: query.mailchimpListId,
			token: query.mailchimpToken,
			fields: req.body[0].mailchimp.fields,
			exclude_fields: req.body[0].mailchimp.exclude_fields,
			since_timestamp_opt: req.body[0].mailchimp.since_timestamp_opt
		},
		moodle: {
			url: query.moodleUrl,
			token: query.moodleToken,
			body: req.body[0]['moodle']
		}
	}
	controller.createUser(param)
	.then((data) => { res.json(data); })
	.catch((error) => {	res.json(error); });
}

exports.createAndEnrolUser = (req, res, next) => {
	let query = url.parse(req.url, true).query;
	
	let param = {
		mailchimp: {
			url: query.mailchimpUrl,
			listId: query.mailchimpListId,
			token: query.mailchimpToken,
			fields: req.body[0].mailchimp.fields,
			exclude_fields: req.body[0].mailchimp.exclude_fields,
			since_timestamp_opt: req.body[0].mailchimp.since_timestamp_opt
		},
		moodle: {
			url: query.moodleUrl,
			token: query.moodleToken,
			body: req.body[0]['moodle']
		},
		enrol: req.body[0].enrol
	}

	controller.createAndEnrolUser(param)
	.then((data) => { res.json(data); })
	.catch((error) => {	res.json(error); });
}