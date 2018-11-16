var contactCenterConfiguration = require('../../PageObjects/contactCenterConfiguration_PO');

var specCommon = require('../../PageObjects/Common_Elements');

var Common = new specCommon()

var contactCenterConfig = new contactCenterConfiguration()



describe('CONFIGURE CONTACT CENTER', function () {



	it('Contact Center Configuration Page Detected', function () {

		contactCenterConfig.clickOnContactCenterConfiguration()

		contactCenterConfig.getPageHeader().then(function (title) {

			expect(title).toEqual('Contact Center Configuration')

			Common.ExecutionLogs('> Configure Contact Page Detected ')

		})

	})



	it('Set Voice Section, Set Chat Section and Set SMS Section', function () {

		browser.driver.sleep(10000)

		contactCenterConfig.setVoiceTab('08:03', '19')

		contactCenterConfig.setChatTab('12', 'demo')

		contactCenterConfig.setSMSTab('20', 'app uptown queue')

		contactCenterConfig.clickOnSave()



		// Verify voice tab

		expect(contactCenterConfig.sucessMessage()).toEqual('Changes saved')

		expect(element(by.name('activityTime')).getAttribute('value')).toEqual('08:03')

		expect(element(by.name('coolDown')).getAttribute('value')).toEqual('19')

		expect(element(by.name('inactive-after-cascading')).isSelected()).toBe(true)

		expect(element(by.css('.reject .configure-call-checkbox')).isSelected()).toBe(true)

		Common.ExecutionLogs('> Verification done for voice tab')



		// Verify char tab

		expect(element(by.xpath("//*[@name='chatQueueAssign']/option[normalize-space()='demo']")).isSelected()).toBe(true)

		expect(element(by.name('reservationTimeChat')).getAttribute('value')).toEqual('12')

		Common.ExecutionLogs('> Verification done for chat tab')





		// Verify sms tab

		expect(element(by.xpath("//*[@name='smsQueueAssign']/option[normalize-space()='app uptown queue']")).isSelected()).toBe(true)

		expect(element(by.name('reservationTimeSms')).getAttribute('value')).toEqual('20')

		Common.ExecutionLogs('> Verification done for sms tab')

	})



	// ############################################Still pending Contains bug#########################################

	//	  it('Call Queues Tab', function() {

	//	

	//	    var randomString = Math.random().toString(36).substring(7)

	//	    var edit = element(by.css('.call-queues-modal'))

	//	

	//	    contactCenterConfig.clickOnCallQueues()

	//	    element(by.css('.headers-row')).getText().then(function(headers) {

	//	      expect(headers).toEqual("QUEUE NAME LAST UPDATE NUMBER OF AGENTS")

	//	    })

	//	

	//	    browser.executeScript("return document.getElementsByTagName('table')[0].rows.length").then(function(rowcount) {

	//	      expect(rowcount).toBeGreaterThan(0)

	//	      expect(rowcount).toBeLessThan(150)

	//	      Common.ExecutionLogs('> Total rows found in Call Queues Grid are: ' + rowcount)

	//	    })

	//	

	//	    contactCenterConfig.gotoAddNewCallQueues(randomString, '5', '5')

	//	

	//	    expect(contactCenterConfig.sucessMessage()).toEqual('Changes saved')

	//	

	//	    browser.driver.sleep(5000)

	//	    expect(contactCenterConfig.getSearchResult(randomString)).toEqual(randomString)

	//	

	//	    edit.click()

	//	    expect(by.css('#call-queue-name .input-validation').getText()).toEqual(randomString)

	//	    expect(by.css('.number-of-agents .input-validation').getText()).toEqual('5')

	//	    expect(by.css('.delay-for-agent .input-validation').getText()).toEqual('5')

	//	    element(by.css('.cancel')).click()

	//	    element(by.css('tbody tr:nth-of-type(2) [type]')).click()

	//	    element(by.css('.archive-button')).click()

	//	

	//	    var EC = protractor.ExpectedConditions;

	//	    browser.wait(EC.visibilityOf(edit, 5000))

	//	    expect(contactCenterConfig.getSearchResult(randomString)).toEqual(randomString)

	//	  })



	it('Inactive Reasons Tab', function () {

		var randomString = Math.random().toString(36).substring(7);



		contactCenterConfig.clickOnInactiveReasons();

		browser.waitForAngular();



		element(by.css('.headers-row')).getText().then(function (headers) {

			expect(headers).toEqual("INACTIVE REASONS")

		})



		browser.sleep(5000);

		browser.executeScript("return document.getElementsByTagName('table')[0].rows.length").then(function (rowcount) {

			expect(rowcount).toBeGreaterThan(0)

			expect(rowcount).toBeLessThan(150)

			Common.ExecutionLogs('> Total rows found in Call Queues Grid are: ' + rowcount)

		})



		browser.sleep(5000);

		var beforeSize = contactCenterConfig.getRowCount()

		contactCenterConfig.gotoAddNewReasons(randomString)

		expect(contactCenterConfig.sucessMessage()).toEqual('Changes saved')



		Common.ExecutionLogs('> Success message appear reasons added')



		browser.sleep(5000);

		var afterSize = contactCenterConfig.getRowCount()



		afterSize.then(function (size) {

			expect(beforeSize).toBe(size - 1)

		})



		var randomString1 = Math.random().toString(36).substring(7)

		contactCenterConfig.gotoEditReasons(randomString, randomString1)



		browser.sleep(5000);

		contactCenterConfig.removeReasons(randomString1)



		expect(contactCenterConfig.sucessMessage()).toEqual('Changes saved')

		browser.sleep(5000)



		var size = contactCenterConfig.getRowCount()

		expect(beforeSize).toBe(size)

	})

})
