const amqp = require('amqplib/callback_api');
exports.readQueue = (conn) => {
	conn.createChannel(function(err, ch) {
			var q = 'teste_queue';
	
			ch.assertQueue(q, {durable: true});
			ch.prefetch(1);
			console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
			ch.consume(q, function(msg) {
				var secs = msg.content.toString().split('.').length - 1;
	
				console.log(" [x] Received %s", msg.content.toString());
				ch.ack(msg);
			//   setTimeout(function() {
			//     console.log(" [x] Done");
			//     ch.ack(msg);
			//   }, secs * 1000);
			}, {noAck: false});
		});
}