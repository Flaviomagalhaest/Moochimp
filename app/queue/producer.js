const amqp = require('amqplib/callback_api');
exports.sendToQueue = (param, list) => {
	return new Promise((resolve, reject) => {
		amqp.connect('amqp://localhost', function(err, conn) { 
			conn.createChannel(function(err, ch) {
			  var q = 'create_user_queue';
			  console.log("Sending "+list.length+" members in list to queue");
				
			  list.map(l => {
					var msg = {param: param, user: l};					
					ch.assertQueue(q, {durable: true});
					ch.sendToQueue(q, new Buffer(JSON.stringify(msg)), {persistent: true});
				});
			  console.log("Sended to queue");
			  resolve(true);
			}); 
		 });
	})    
 }