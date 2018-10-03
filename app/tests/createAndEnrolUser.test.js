const controller = require('../controller/moochimpController');

it('return value 4 (course id) of object user', () => {
   var param = {"param":{"url":"http://localhost/moodle/","token":"8062709c8137021140b2ad168d78cbe3","body":{"username":{"email_address":""},"password":"Fcamara@2018","firstname":{"merge_fields":{"FNAME":""}},"lastname":{"merge_fields":{"LNAME":""}},"email":{"email_address":""},"customfields":[{"type":"evento","value":"Programa de Formação 2018"}],"enrol":{"merge_fields":{"MMERGE9":""}}}},"user":{"username":"lemaartins1@gmail.com","password":"Fcamara@2018","firstname":"leandro","lastname":"martins","email":"lemaartins1@gmail.com","customfields":[{"type":"evento","value":"Programa de Formação 2018"}],"enrol":"user experience designer"},"enrol":{"desenvolvedor full stack":"3","data science":"5","user experience designer":"4"}}
   expect(controller.createAndEnrolUser(param)).toEqual("4");
});

it('return value 3 (course id) of object user', () => {
   var param = {"param":{"url":"http://localhost/moodle/","token":"8062709c8137021140b2ad168d78cbe3","body":{"username":{"email_address":""},"password":"Fcamara@2018","firstname":{"merge_fields":{"FNAME":""}},"lastname":{"merge_fields":{"LNAME":""}},"email":{"email_address":""},"customfields":[{"type":"evento","value":"Programa de Formação 2018"}],"enrol":{"merge_fields":{"MMERGE9":""}}}},"user":{"username":"lemaartins1@gmail.com","password":"Fcamara@2018","firstname":"leandro","lastname":"martins","email":"lemaartins1@gmail.com","customfields":[{"type":"evento","value":"Programa de Formação 2018"}],"enrol":"desenvolvedor full stack"},"enrol":{"desenvolvedor full stack":"3","data science":"5","user experience designer":"4"}}
   expect(controller.createAndEnrolUser(param)).toEqual("3");
});

it('return value 5 (course id) of object user', () => {
   var param = {"param":{"url":"http://localhost/moodle/","token":"8062709c8137021140b2ad168d78cbe3","body":{"username":{"email_address":""},"password":"Fcamara@2018","firstname":{"merge_fields":{"FNAME":""}},"lastname":{"merge_fields":{"LNAME":""}},"email":{"email_address":""},"customfields":[{"type":"evento","value":"Programa de Formação 2018"}],"enrol":{"merge_fields":{"MMERGE9":""}}}},"user":{"username":"lemaartins1@gmail.com","password":"Fcamara@2018","firstname":"leandro","lastname":"martins","email":"lemaartins1@gmail.com","customfields":[{"type":"evento","value":"Programa de Formação 2018"}],"enrol":"data science"},"enrol":{"desenvolvedor full stack":"3","data science":"5","user experience designer":"4"}}
   expect(controller.createAndEnrolUser(param)).toEqual("5");
});

it('return undefined', () => {
   var param = {"param":{"url":"http://localhost/moodle/","token":"8062709c8137021140b2ad168d78cbe3","body":{"username":{"email_address":""},"password":"Fcamara@2018","firstname":{"merge_fields":{"FNAME":""}},"lastname":{"merge_fields":{"LNAME":""}},"email":{"email_address":""},"customfields":[{"type":"evento","value":"Programa de Formação 2018"}],"enrol":{"merge_fields":{"MMERGE9":""}}}},"user":{"username":"lemaartins1@gmail.com","password":"Fcamara@2018","firstname":"leandro","lastname":"martins","email":"lemaartins1@gmail.com","customfields":[{"type":"evento","value":"Programa de Formação 2018"}],"enrol":"data science"}}
   expect(controller.createAndEnrolUser(param)).toEqual(undefined);
});