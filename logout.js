var SignOut = require('D:/Angular/PageObjects/logout_PO');
var logoutCommon = require('D:/Angular/PageObjects/Common_Elements');

var Common = new logoutCommon();

describe('Logout', function() 
{
    it('Sign out of CallPotential', function()
    {
        var logoff = new SignOut(); 
        // browser.actions().mouseMove(uIcon).sleep(2000).click().perform();
        browser.executeScript('window.scrollTo(0,0);').then(function(){
            Common.ExecutionLogs('> SCROLLED UP to reach the User Icon');
            logoff.UserIconButton();

            browser.driver.sleep(5000);

            logoff.LogoutButton();
        }); 

        // logoff.UserIconButton();
        // browser.driver.sleep(3000);

        // logoff.LogoutButton();
        // browser.driver.sleep(5000);
        browser.driver.getTitle().then(function(pageTitle) {
  
            expect(pageTitle).toEqual('CallPotential | Login');
            Common.ExecutionLogs("> Logged out Successfully!");
            browser.driver.sleep(2000);
            });
    });
});