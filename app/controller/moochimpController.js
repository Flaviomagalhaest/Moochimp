const mailchimpController = require('../controller/mailchimpController');
const moodleController = require('../controller/moodleController');
const amqp = require('amqplib/callback_api');
const totalRequisicao = 50;	//Max number of users in each requisition
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

exports.sendToQueue = (param, list) => {
	return new Promise((resolve, reject) => {
		amqp.connect('amqp://localhost', function(err, conn) { 
			conn.createChannel(function(err, ch) {
			  var q = 'create_user_queue';
			  console.log("Sending "+list.length+" members in list to queue");
				
			  list.map(l => {
					var msg = {param, l};					
					ch.assertQueue(q, {durable: true});
					ch.sendToQueue(q, new Buffer(msg), {persistent: true});
				});
			  console.log("Sended to queue");
			  resolve(true);
			}); 
		 });
	})    
 }

exports.createUser = (param) => {
	return new Promise((resolve, reject) => {
		mailchimpController.getTotalUsers(param.mailchimp.url, param.mailchimp.token, 
			param.mailchimp.listId)
		.then((data) => {
			let total = Object.values(data.stats)
			.reduce((accum, curr) => accum + curr);
			return returnListUserMailchimp(total, param)})
		.then((listMailChimp) => {
			let listToQueue = buildObjectUser(listMailChimp);
			resolve(listMailChimp);
			// 	return sendToQueue(param.moodle, listaMailChimp) })
		// .then((flag) => {
		// 	resolve(flag);
		});
	});
}

buildObjectUser = (listUsers) => {
	let moodleParams = params.moodle.body;
	let listToQueue = []
	listUsers.map(user => {
		let u = {};
		Object.assign(u, moodleParams);
		Object.keys(moodleParams).forEach(m => {
			var b = "";
		})
		var a = "";
	})
	var a = params.moodle.body;
}

// Receive moodle argument and moochimp user. Prepare moodle object with user params
exports.getMailchimpData = (arg, user) => {
   let result = "";
   if (arg instanceof Object && arg instanceof Array) {
      return getMailchimpDataList(arg, result, user);
	} else if (arg instanceof Object) {
		return getMailchimpDataObject(arg, user)
	} else {
		return arg;
	}
}

// Read params in list and add then
getMailchimpDataList = (arg, result, user) => {
   arg.map(a => {
      result += exports.getMailchimpData(a, user);
   });
   return result;
}

// Transform object json to get params in mailchimp user
getMailchimpDataObject = (arg, user) => {
   return Object.keys(arg).map(a => {
      if (arg[a] == "") {
         return user[a];
      } else {
         return exports.getMailchimpData(arg[a],user[a]);
      }
   })[0];
}
returnListUserMailchimp = (total, param) => {
	params = {
		url: param.mailchimp.url,
		count: totalRequisicao,
		offset: 0,
		listId: param.mailchimp.listId,
		fields: param.mailchimp.fields,
		exclude_fields: param.mailchimp.exclude_fields,
		since_timestamp_opt: param.mailchimp.since_timestamp_opt,
		token: param.mailchimp.token,
		moodle: param.moodle
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
	let list = members.filter(member => { 
		return member.length > 0 
	})
	listReturn = [];
	return cleaningList(list);
}
cleaningList = (list) => {
	list.map(l => {
		(Array.isArray(l) ? cleaningList(l) : listReturn.push(l));
	})
	return listReturn.filter(f => {return (f)});
}