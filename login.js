var loginPage = require('D:/Angular/PageObjects/login_PO');
var specCommon =  require('D:/Angular/PageObjects/Common_Elements');

var Common = new specCommon();

describe('CP Angular', function() {
  beforeEach(function ()
  {
    browser.ignoreSynchronization = true;
  });

it('Verify Login page title', function()
{
  
  var cpLoginpage = new loginPage();
  cpLoginpage.url();
  browser.driver.getTitle().then(function(pageTitle) {
  
  expect(pageTitle).toEqual('CallPotential | Login');
  Common.ExecutionLogs('> Pre-Login Title Matched');
  browser.driver.sleep(5000);
  });

  
  cpLoginpage.enterUsername('callpotential.test@gmail.com');
  cpLoginpage.enterPassWord('cp2k17');
  cpLoginpage.loginButton();

  browser.driver.sleep(5000);
  browser.driver.getTitle().then(function(pageTitle) 
  {
    
      if (pageTitle=='CallPotential | Advanced Dashboard' || pageTitle == 'CallPotential | Dashboard')
      {
          Common.ExecutionLogs('> Login Successful! Post-Login Title Matched');
          cpLoginpage.SwitchBack();
      }
      else 
      {
          expect(browser.getCurrentUrl()).toEqual('https://stage.callpotential.com/ui/v2/dashboard');
          Common.ExecutionLogs('> Already on new UI!');
      }
    });
    browser.driver.sleep(5000);
});

});