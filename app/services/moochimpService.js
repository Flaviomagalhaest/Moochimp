"use strict";
const url = require('url');
const controller = require('../controller/moochimpController');
exports.sendToQueue = (req, res, next) => {
  console.log('testando fila')

//   amqp.connect('amqp://localhost', function(err, conn) { 
//     conn.createChannel(function(err, ch) {
//       var q = 'teste_queue';
//       var msg = "Hello World!";
  
//       ch.assertQueue(q, {durable: true});
//       ch.sendToQueue(q, new Buffer(msg), {persistent: true});
//       console.log(" [x] Sent '%s'", msg);        
//     });
//   res.json('');
//   });
	controller.sendToQueue()
	.then((a) => {
		res.json(a)
	});
}


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
	.then((data) => {
		let listMailchimp = data;
	});
	res.json("");
}