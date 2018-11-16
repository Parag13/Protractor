
var specCommon =   require('D:/Angular/PageObjects/Common_Elements');
var CallConnect =  require('D:/Angular/PageObjects/Call_Connect_PO');


var Common =    new specCommon();
var Call =      new CallConnect();

describe('Call Center Angular =>', function() 
{
    it('Open the app4 url to place a Test Call', function()
    {
        
        browser.driver.sleep(5000);
        browser.executeScript('window.open()').then(function () 
        {
            browser.getAllWindowHandles().then(function (handles) 
            {
                  var secondWindow = handles[1];
                  browser.ignoreSynchronization = true;
                  browser.switchTo().window(secondWindow).then(function () 
                  {
                    Call.url();
                    browser.driver.sleep(5000);
                    Call.CallNumber('6063936081');
                    Call.Callbutton();
                    browser.driver.sleep(5000);
                    
                    browser.driver.sleep(5000);
                    // do whatever you want to do in new window
                  });  
                  var firstWindow = handles[0];
                    browser.switchTo().window(firstWindow).then(function () 
                    {
                
                        browser.driver.sleep(5000);
                        Common.ExecutionLogs('> Switching back to first tab');
                        console.log("Returning back");
                    });  
            });
            });    
        
    });

    it('Confirm & Accept the Call Pop-up', function()
    {
        
        var EC = protractor.ExpectedConditions;
        
        var CallFrom = element(by.xpath("//span[@class = 'caller-number']"));
        browser.wait(EC.elementToBeClickable((CallFrom), 7000));
        expect('+14125671273').toBe(CallFrom.getText());
        Call.AcceptCall();

        browser.driver.sleep(5000);
        Call.EndCallbutton();
        Common.ExecutionLogs('> Call Ended');

        browser.driver.sleep(5000);
        var cooldown = element(by.xpath("//a[@class = 'dropdown-title']"));
        var status = EC.elementToBeClickable(cooldown);
        browser.wait(status, 7000);
        cooldown.getText().then(function(text) 
        {
            Common.ExecutionLogs('The dropdown says: ',text);
            var abc = text.substr(0, 8);
            expect('Cooldown').toBe(abc);
            Common.ExecutionLogs('> Agent Status changed to Cooldown');
            browser.driver.sleep(5000);
        });
        
        
        
    });
});
