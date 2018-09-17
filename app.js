const express = require('./config/express');
const bodyParser = require('body-parser')

const app = express();
const routes = require('./app/routes/index')(app);

app.listen(3000, function(){
    console.log("servidor rodando");
});

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

// app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v1', routes);