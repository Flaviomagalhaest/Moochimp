module.exports = function(app) {

    const moodle = require('../services/moodleService');
    const mailchimp = require('../services/mailchimpService');
    const bodyParser = require('body-parser');

    //Handler body in post requisitions
    app.use(bodyParser.json())

    app.get('/', function(req,res){
        res.render("index");
    });

    //Moodle Services
    app.route('/moodle/getToken')
        .get(moodle.getToken);

    app.route('/moodle/createUser')
        .post(moodle.createUser);
        
    app.route('/moodle/teste')
        .get(moodle.teste);

    //Mailchimp Services
    app.route('/mailchimp/getTotalUsers')
        .get(mailchimp.getTotalUsers);
}