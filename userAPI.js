var supertest = require('supertest');
var request = require('request');
var chai = require('chai');
var expect = require('chai').expect;
var server = supertest.agent('https://qa-841-core.callpotential.com/');

var UserJson = '';
var token = '';
var UserId = '';
describe('Lets Test Core-MicroService', function()
{
    it ('POST method for login endpoint', function(done1)
    {
    this.timeout(15000);
    server
          .post("/session")
          .set('content-type', 'application/json')
          .send({
            "username": "simpson@callpotential.com",
            "password": "cp2k17",
            "user_id": 235
          })
          
          .expect(200)
          .end(function (err, res)
          {
              if(!err)
              {
                  chai.expect(res.body.user).to.have.exist('authtoken');
                  chai.expect(res.statusCode).to.equal(200);
                  console.log(res.body);
                  token = res.body.session_id;
                  console.log(token);
                  done1();
              }
              else
              {
                  console.log(err);
              }
          }
        )

    });

    it ('POST method for User endpoint', function(done)
    {
    this.timeout(15000);
    console.log("this is the token", token);
    server
          .post("/user")
          .set('content-type', 'application/json')
          .set("Authorization", token)
          .send({
            "user_id": 123,
            "plan_id": 3,
            "email": "swagger@test.com",
            "firstname": "Swagger",
            "lastname": "Mocha",
            "phone": "5555555555",
            "question1": "",
            "question2": "",
            "question3": "",
            "companyname": "Codal",
            "master": 0,
            "signupdate": "2015-08-28 13:58:27",
            "lastagreement": "0000-00-00 00:00:00",
            "agreement_ip": "",
            "creditamount": 0,
            "active": 1,
            "lastlogin": "2018-10-17 06:21:38",
            "sid": "",
            "authtoken": "",
            "howheard": "swaggerMocha",
            "confirmed": 0,
            "parent_id": 235,
            "reports": "",
            "tips": "{\"home\":{\"page1\":1,\"page2\":1,\"page3\":1,\"page4\":1,\"page5\":1,\"page6\":1,\"page7\":1,\"page8\":1,\"page9\":1,\"page10\":1,\"page11\":1,\"page12\":1,\"page13\":1,\"page14\":1,\"page15\":1},\"people\":{\"page1\":1,\"page2\":1,\"page3\":1,\"page4\":1,\"page5\":1,\"page6\":1,\"page7\":1},\"leads\":{\"page1\":1,\"page2\":1,\"page3\":1,\"page14\":1,\"page5\":1},\"calls\":{\"page1\":1,\"page2\":1,\"page3\":1,\"page4\":1,\"page5\":1,\"page6\":1},\"grades\":{\"page1\":1,\"page2\":1,\"page3\":1,\"page4\":1,\"page5\":1,\"page16\":1,\"page7\":1,\"page8\":1,\"page9\":1},\"broadcasts\":{\"page1\":1,\"page2\":1,\"page3\":1,\"page4\":1,\"page5\":1,\"page16\":1,\"page7\":1}}",
            "dashboard": 0,
            "default_location": 509,
            "default_timezone": "America/Chicago",
            "dm_report_period": "none",
            "dm_report_last_update": "",
            "newlead_email_notify": 0,
            "send_followup_notification": 0,
            "send_collection_notification": 0,
            "optin_mktg": 1,
            "is_test_account": 0,
            "dm_report_send_day": "",
            "delayed_collection_email_notify": 1,
            "is_agent": 0,
            "agent_call_sid": "",
            "agent_calling_sid": "",
            "is_agent_call_connected": 0,
            "agent_status": "offline",
            "inactive_reason": "",
            "tc_access_token": "axFZj4Cn3iFc9cJIFqbhjMkhAQjsSN9li-dU6~dfoiA_",
            "is_logged_in": 0,
            "scheduled_logout": "",
            "session_refresh": "",
            "disable_unsubscribe_txt": 0,
            "custom_variables": "swaggerMocha.custom",
            "show_admin_in_emp_dropdown": 1,
            "employee_restrict_percent": 100,
            "manager_restrict_percent": 100,
            "agent_restrict_percent": 100,
            "workspace_sid": "",
            "worker_sid": "",
            "enable_console_log": 0,
            "other_option_employee": 0,
            "other_option_required": 0,
            "consolidate_invoices": "0",
            "restrict_manager_edit_employee_grade": "0",
            "exclusion_list_type": "location",
            "transcribe_api": "",
            "is_response_note_enabled": 0,
            "txt_consent": 0,
            "opt_in_txt": 0,
            "enable_duplicate_lead_email_notification": 0,
            "duplicate_lead_email_notification_setup": "",
            "restrict_manager_edit_location_grade": "0",
            "kiosk_connection": 10,
            "sms_silence": 0,
            "disable_movein": 0
          })
          .expect(201)
          .end(function (err, res)
          {
              if(!err)
              {
                //   chai.expect(res.body).to.have.exist('user_id', "123");
                  chai.expect(res.statusCode).to.equal(201);
                  UserJson = res.body;
                  UserId = res.body.user_id;
                  console.log("The POST response for /user endpoint is:",res.body.user_id);
                  console.log("The POST response for /user endpoint is:",res.body);
                  done();
              }
              else
              {
                  console.log(err);
              }
          }
        )

    });

    it ('GET by id method for User endpoint', function(done)
    {
    this.timeout(15000);
    console.log("this is the token", token);
    server
          .get("/user/"+UserId)
          .set('content-type', 'application/json')
          .set("Authorization", token)
          
          .expect(200)
          .end(function (err, res)
          {
              if(!err)
              {
                  chai.expect(res.body).to.have.exist('user_id', 123);
                  chai.expect(res.statusCode).to.equal(200);
                  console.log(res.body);
                  done();
              }
              else
              {
                  console.log(err);
              }
          }
        )

    });

    

});

    
