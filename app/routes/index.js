module.exports = function(app) {

    var moodle = require('../services/moodle');

    app.get('/', function(req,res){
        res.render("index");
    });


    app.route('/moodle/getToken')
        .get(moodle.getToken);

    app.route('/moodle/createUser')
        .post(moodle.createUser);
        
    app.route('/moodle/teste')
        .get(moodle.teste);
}