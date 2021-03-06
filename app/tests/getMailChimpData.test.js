const controller = require('../controller/moochimpController');

it('expected string in response', () => {
   var test = "test";
   expect(controller.getMailchimpData(test)).toBe("test");
});

it('return string "FirstSecondTest"', () => {
   var list = ["First", ["Second", ["Test"]]];
   expect(controller.getMailchimpData(list)).toBe("FirstSecondTest");
});

it('return email "test@outlook.com"', () => {
   var users = {"id":"883162de08ec1bd75d151e6d4124b8ea","email_address":"test@outlook.com","merge_fields":{"FNAME":"Leon","LNAME":"Freitas","ADDRESS":"","PHONE":"","MMERGE5":"","MMERGE6":"1992-02-22","MMERGE7":"9999999","MMERGE8":"","MMERGE9":"Desenvolvedor","MMERGE10":"","MMERGE11":"","MMERGE12":"2","MMERGE13":"2018-09-25 14:09:58"}};
   var list = {"email_address":""};
   // var list = {"username":{"email_type":""},"password":["Fcamara@",{"merge_fields":{"MMERGE6":""}}],"firstname":{"merge_fields":{"FNAME":""}},"lastname":{"merge_fields":{"LNAME":""}},"email":{"email_address":""}};
   expect(controller.getMailchimpData(list, users)).toBe("test@outlook.com");
});

it('return email "test@outlook.com"', () => {
   var users = {"id":"883162de08ec1bd75d151e6d4124b8ea","email_address":"test@outlook.com","merge_fields":{"FNAME":"Leon","LNAME":"Freitas","ADDRESS":"","PHONE":"","MMERGE5":"","MMERGE6":"1992-02-22","MMERGE7":"9999999","MMERGE8":"","MMERGE9":"Desenvolvedor","MMERGE10":"","MMERGE11":"","MMERGE12":"2","MMERGE13":"2018-09-25 14:09:58"}};
   var list = {"merge_fields":{"FNAME":""}};
   expect(controller.getMailchimpData(list, users)).toBe("leon");
});

it('return email "test@outlook.com"', () => {
   var users = {"id":"883162de08ec1bd75d151e6d4124b8ea","email_address":"test@outlook.com","merge_fields":{"FNAME":"Leon","LNAME":"Freitas","ADDRESS":"","PHONE":"","MMERGE5":"","MMERGE6":"1992-02-22","MMERGE7":"9999999","MMERGE8":"","MMERGE9":"Desenvolvedor","MMERGE10":"","MMERGE11":"","MMERGE12":"2","MMERGE13":"2018-09-25 14:09:58"}};
   var list = ["Fcamara@",{"merge_fields":{"MMERGE6":""}}];
   expect(controller.getMailchimpData(list, users)).toBe("Fcamara@1992-02-22");
});