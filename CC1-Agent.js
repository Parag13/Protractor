var CCconnect = require('D:/Angular/PageObjects/Agent_Connect_PO');
var specCommon =  require('D:/Angular/PageObjects/Common_Elements');


var Common =    new specCommon();
var CC =        new CCconnect();


describe('Call Center Angular =>', function() 
{
    
  it('Connect via PC', function()
    {
        var EC = protractor.ExpectedConditions;
        var dropdown =    element(by.xpath("//i[@class = 'webfont webfont-chevron-down arrow']"));
// Waits for the element with id 'abc' to be clickable.
        browser.wait(EC.elementToBeClickable((dropdown), 15000));
        dropdown.click();

        browser.driver.sleep(2000);
        // CC.ClickOnArrow();
        // browser.driver.sleep(2000);
        CC.SelectConnect();
        browser.driver.sleep(2000);
        CC.ConnectViaComputer();
        browser.driver.sleep(5000);

        Common.ExecutionLogs('> Agent Connecting via Computer..');

    });

    it('Verify the agent name and status', function()
    {
        
        browser.driver.sleep(5000);
        
        // expect(AgentName1.count()).toBe(2);
        var len ;
        element.all(by.xpath("//p[@class = 'name']")).then(function(totalRows) 
        {
            len = totalRows.length;
            console.log('==> No. of rows: ',len);
            
            //Verify the Agent Name
            var AgentName1 = element.all(by.xpath("//p[@class = 'name']")).get(len-1);
            AgentName1.getText()
            .then(function (validateText)
            {
                expect('callpotential.test@gmail.com').toBe(AgentName1.getText());
                console.log('Count is:>>> ', validateText.length);
            });

            //Verify the Agent Status
            var AgentStatus = element.all(by.xpath("//div[@class = 'small-2']")).get(len-1);
            AgentStatus.getText()
            .then(function (validateText)
            {
            // Compare the result
                expect('Ready').toBe(AgentStatus.getText());
            });

         });
        
        browser.driver.sleep(5000);
       
    });

    
});
