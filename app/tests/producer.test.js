const producer = require('../queue/producer');

//Needed rabbitmq connection
test.skip('adding user object in queue', () => {
    var users = [{"username":"juanvitor2001@outlook.com","password":"Fcamara@2001-02-22","firstname":"Juan","lastname":"Freitas","email":"juanvitor2001@outlook.com"},{"username":"lucas.r.santos@gmail.com","password":"Fcamara@1995-04-19","firstname":"Lucas","lastname":"Ribeiro","email":"lucas.r.santos@gmail.com"},{"username":"lemaartins1@gmail.com","password":"Fcamara@1997-03-04","firstname":"Leandro","lastname":"Martins","email":"lemaartins1@gmail.com"}]
    var params = {"url":"moodle","token":"moodle","body":{"username":{"email_address":""},"password":["Fcamara@",{"merge_fields":{"MMERGE6":""}}],"firstname":{"merge_fields":{"FNAME":""}},"lastname":{"merge_fields":{"LNAME":""}},"email":{"email_address":""}}}
    producer.sendToQueueCreateUser(params, users).then(expect(true).toBe(true));

});