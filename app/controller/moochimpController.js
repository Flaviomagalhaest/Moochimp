const mailchimpController = require('../controller/mailchimpController');
const totalRequisicao = 20;	//Max number of users in each requisition
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

exports.createUser = (param) => {
	mailchimpController.getTotalUsers(param['url'], param['token'], param['listId'],
		(ret) => {
			let total = Object.values(ret.stats).reduce((accum, curr) => accum + curr);
			let usersMailchimp = returnListMailchimp(total, param).then(
				(result) => {
					var b = 'a';
				}
			);
			var a = 'a';
		}
	);
}

returnListMailchimp = (total, arg) => {
	var promise = new Promise(function(resolve, reject) {
		params = {
			url: arg['url'],
			count: totalRequisicao,
			offset: 0,
			fields: arg.body['fields'],
			exclude_fields: arg.body['exclude_fields'],
			since_timestamp_opt: arg.body['since_timestamp_opt'],
			token: arg['token']
		}
		let lista = []
		if (total > totalRequisicao) {
	
		} else {
			mailchimpController.getInfoUsers(params, arg['listId'], (ret) => {
				resolve(ret);
			});
		}
	});
	var a = "a";
}