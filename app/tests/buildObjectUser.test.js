const controller = require('../controller/moochimpController');

it('expect moodle object user populate', () => {
    var users = [{"id":"883162de08ec1bd75d151e6d4124b8ea","email_address":"test@outlook.com","merge_fields":{"FNAME":"Leon","LNAME":"Freitas","ADDRESS":"","PHONE":"","MMERGE5":"","MMERGE6":"1992-02-22","MMERGE7":"9999999","MMERGE8":"","MMERGE9":"Desenvolvedor","MMERGE10":"","MMERGE11":"","MMERGE12":"2","MMERGE13":"2018-09-25 14:09:58"}}];
    params = {"moodle":{"body":{"username":{"email_address":""},"password":["Fcamara@",{"merge_fields":{"FNAME":""}}],"firstname":{"merge_fields":{"FNAME":""}},"lastname":{"merge_fields":{"LNAME":""}},"email":{"email_address":""}}}};
    result = [{"username":"test@outlook.com","password":"Fcamara@leon","firstname":"leon","lastname":"freitas","email":"test@outlook.com"}];
    expect(controller.buildObjectUser(users)).toEqual(result);
});

it('expect moodle object with custom fields', () =>{
    var users = [{"id":"883162de08ec1bd75d151e6d4124b8ea","email_address":"test@outlook.com","merge_fields":{"FNAME":"Leon","LNAME":"Freitas","ADDRESS":"","PHONE":"","MMERGE5":"","MMERGE6":"1992-02-22","MMERGE7":"9999999","MMERGE8":"","MMERGE9":"Desenvolvedor","MMERGE10":"","MMERGE11":"","MMERGE12":"2","MMERGE13":"2018-09-25 14:09:58"}}];
    params = {"moodle":{"body":{"username":{"email_address":""},"password":["Fcamara@",{"merge_fields":{"FNAME":""}}],"firstname":{"merge_fields":{"FNAME":""}},"lastname":{"merge_fields":{"LNAME":""}},"email":{"email_address":""},"customfields":[{"type":"evento","value":"Programa de Formação 2018"}]}}};
    result = [{"username":"test@outlook.com","password":"Fcamara@leon","firstname":"leon","lastname":"freitas","email":"test@outlook.com","customfields": [{"type": "evento", "value": "Programa de Formação 2018"}]}];
    expect(controller.buildObjectUser(users)).toEqual(result);
})

it('expect moodle object with enrol field', () =>{
    var users = [{"id":"883162de08ec1bd75d151e6d4124b8ea","email_address":"test@outlook.com","merge_fields":{"FNAME":"Leon","LNAME":"Freitas","ADDRESS":"","PHONE":"","MMERGE5":"","MMERGE6":"1992-02-22","MMERGE7":"9999999","MMERGE8":"","MMERGE9":"Desenvolvedor","MMERGE10":"","MMERGE11":"","MMERGE12":"2","MMERGE13":"2018-09-25 14:09:58"}}];
    params = {"moodle":{"body":{"username":{"email_address":""},"password":"Fcamara@2018","firstname":{"merge_fields":{"FNAME":""}},"lastname":{"merge_fields":{"LNAME":""}},"email":{"email_address":""},"customfields":[{"type":"evento","value":"Programa de Formação 2018"}],"enrol":{"merge_fields":{"MMERGE9":""}}}}}
    result = [{"username":"test@outlook.com","password":"Fcamara@2018","firstname":"leon","lastname":"freitas","email":"test@outlook.com","customfields": [{"type": "evento", "value": "Programa de Formação 2018"}], "enrol":"desenvolvedor"}];
    expect(controller.buildObjectUser(users)).toEqual(result);
})