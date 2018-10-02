const moodleController = require('../controller/moodleController');
const producer = require('../queue/producer');


exports.readQueueCreateUser = (conn) => {
	conn.createChannel(function(err, ch) {
			var q = 'create_user_queue';
	
			ch.assertQueue(q, {durable: true});
			ch.prefetch(1);
			ch.consume(q, function(msg) {
				let user = JSON.parse(msg.content.toString()).user;
				let param = JSON.parse(msg.content.toString()).param;
				console.log(" Received user ", user.username);
				moodleController.createUser(param.url, param.token, [user])
				.then((result) => { 
					console.log("user created successfully");
					console.log(result);
					ch.ack(msg);
				})
				.catch((result) => {
					console.log(result);
					producer.sendToFailQueue(user, result);
					ch.ack(msg);
				});
			}, {noAck: false});
		});
}