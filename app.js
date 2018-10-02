const express = require('./config/express');
const amqp = require('amqplib/callback_api');
const app = express();
const routes = require('./app/routes/index')(app);

app.listen(3000, function(){
    console.log("servidor rodando");
});

//Swagger settings
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// RabbitMQ
amqp.connect('amqp://localhost', function(err, conn) {
    let controller = require('./app/queue/consumer');
    controller.readQueueCreateUser(conn);
});