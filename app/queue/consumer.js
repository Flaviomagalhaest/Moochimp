const moodleController = require('../controller/moodleController');
const moochimpController = require('../controller/moochimpController');
const producer = require('../queue/producer');


exports.readQueueCreateUser = (conn) => {
	conn.createChannel(function(err, ch) {
			var q = 'create_user_queue';
	
			ch.assertQueue(q, {durable: true});
			ch.prefetch(1);
			ch.consume(q, function(msg) {
				let message = JSON.parse(msg.content.toString());
				var user = message.user;
				var param = message.param;
				console.log(" Received user ", user.username);

				var enrol = moochimpController.createAndEnrolUser(message);

				moodleController.createUser(param.url, param.token, [user])
				.then((result) => { 
					console.log("user created successfully");
					console.log(result);
					//Case need enrol user in course
					enrolUser(enrol, result, param, user);
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

enrolUser = (enrol, result, param, user) => {
	if(enrol != undefined) {
		let e = { "roleid": "5", "userid": result[0].id, "courseid": enrol	}	//enrol object
		moodleController.enrolUser(param.url, param.token, [e])
		.then((result) => {
			console.log("User sucefully enroled!");
		}).catch((error) => {
			console.log("Error to enrol user in course");
			producer.sendToFailEnrolQueue(user, "Error to enrol user in course");
		});
	}
}