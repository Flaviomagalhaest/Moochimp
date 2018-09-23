"use strict";
var amqp = require('amqplib/callback_api');
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

}