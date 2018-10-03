const amqp = require('amqplib/callback_api');
exports.sendToQueueCreateUser = (param, list) => {
	return new Promise((resolve, reject) => {
		amqp.connect('amqp://localhost', function(err, conn) { 
			conn.createChannel(function(err, ch) {
			  var q = 'create_user_queue';
			  console.log("Sending "+list.length+" members in list to queue");
				
			  list.map(l => {
					let enrol = ("enrol" in param) ? param.enrol : undefined;
					var msg = {param: param.moodle, user: l, enrol: enrol};					
					ch.assertQueue(q, {durable: true});
					ch.sendToQueue(q, new Buffer(JSON.stringify(msg)), {persistent: true});
				});
			  console.log("Sended to queue");
			  resolve(true);
			}); 
		 });
	});   
 }

exports.sendToFailQueue = (user, failreturn) => {
	return new Promise((resolve, reject) => {
		amqp.connect('amqp://localhost', function(err, conn) { 
			conn.createChannel(function(err, ch) {
				var q = 'fail_queue';
				console.log("Sending "+user.username+" to fail queue");

				var msg = {user: user, return: failreturn};
				ch.assertQueue(q, {durable: true});
				ch.sendToQueue(q, new Buffer(JSON.stringify(msg)), {persistent: true});
			});
			console.log("Sended to queue");
			resolve(true);
		});
	});
}

exports.sendToFailEnrolQueue = (user, failreturn) => {
	return new Promise((resolve, reject) => {
		amqp.connect('amqp://localhost', function(err, conn) { 
			conn.createChannel(function(err, ch) {
				var q = 'fail_enrol_queue';
				console.log("Sending "+user.username+" to fail queue");

				var msg = {user: user, return: failreturn};
				ch.assertQueue(q, {durable: true});
				ch.sendToQueue(q, new Buffer(JSON.stringify(msg)), {persistent: true});
			});
			console.log("Sended to queue");
			resolve(true);
		});
	});
}