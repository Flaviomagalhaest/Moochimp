const mailchimpController = require('../controller/mailchimpController');
const totalRequisicao = 2;	//Max number of users in each requisition
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
	return new Promise((resolve, reject) => {
		mailchimpController.getTotalUsers(param['url'], param['token'], param['listId'])
		.then((data) => {
			let total = Object.values(data.stats)
			.reduce((accum, curr) => accum + curr);
			return returnListUserMailchimp(total, param); })
		.then((listaMailChimp) => {
			resolve(listaMailChimp);
		});
	});
}

returnListUserMailchimp = (total, param) => {
	params = {
		url: param['url'],
		count: totalRequisicao,
		offset: 0,
		listId: param['listId'],
		fields: param.body['fields'],
		exclude_fields: param.body['exclude_fields'],
		since_timestamp_opt: param.body['since_timestamp_opt'],
		token: param['token']
	}
	if (total > totalRequisicao) {
		return getInfoUsersPerCall(total, params);
	} else {
		return mailchimpController.getInfoUsers(params);
	}
}

//Make list of users doing multiple-calls in API respecting number max of users per call
getInfoUsersPerCall = (total, params) => {
	return new Promise((resolve, reject) => {
		let count = 0;
		let promises = [];
		while (total > count) {
			params['offset'] = count
			promises.push(mailchimpController.getInfoUsers(params));
			count = count + totalRequisicao;
		}
		Promise.all(promises)
		.then((data) => {
			let members = transformInListMembers(data);
			resolve(members);
		});
	});
}
//Receives list of object members. Respond list of users filtred
transformInListMembers = (members) => {
	return members
	.filter((member) => { 
		return member.length > 0 
	})
	.map((m) => { return m });
}