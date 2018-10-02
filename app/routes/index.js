module.exports = function(app) {

    const moodle = require('../services/moodleService');
    const mailchimp = require('../services/mailchimpService');
    const moochimp = require('../services/moochimpService');
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

    app.route('/moodle/getUsers')
        .post(moodle.getUsers);
    
    app.route('/moodle/enrolUser')
        .post(moodle.enrolUser);        

    //Mailchimp Services
    app.route('/mailchimp/getTotalUsers')
        .get(mailchimp.getTotalUsers);

    app.route('/mailchimp/getInfoUsers')
        .post(mailchimp.getInfoUsers);        

    //Moochimp Services
    app.route('/moochimp/sendToQueue')
        .get(moochimp.sendToQueue);

    app.route('/moochimp/createUser')
        .post(moochimp.createUser);
}