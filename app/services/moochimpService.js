"use strict";
const amqp = require('amqplib/callback_api');
const url = require('url');
const controller = require('../controller/moochimpController');
exports.sendToQueue = (req, res, next) => {
  console.log('testando fila')

  amqp.connect('amqp://localhost', function(err, conn) { 
    conn.createChannel(function(err, ch) {
      var q = 'teste_queue';
      var msg = "Hello World!";
  
      ch.assertQueue(q, {durable: true});
      ch.sendToQueue(q, new Buffer(msg), {persistent: true});
      console.log(" [x] Sent '%s'", msg);        
    });
  res.json('');
  });    
}

exports.createUser = (req, res, next) => {
	let query = url.parse(req.url, true).query;
	
	let mailchimpParam = {
		url: query.mailchimpUrl,
		listId: query.mailchimpListId,
		token: query.mailchimpToken,
		body: req.body[0]['mailchimp']
	}

	let moodleParam = {
		url: query.moodleUrl,
		token: query.moodleToken,
		body: req.body[0]['moodle']
	}

	controller.createUser(mailchimpParam)
	.then((data) => {
		let listMailchimp = data;
	});
	res.json("");
}