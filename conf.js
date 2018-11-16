var retry = require('protractor-retry').retry;

exports.config = {

  seleniumAddress: 'http://localhost:4444/wd/hub',

  plugins: [{
    package: 'D:/Angular/node_modules/protractor-screenshoter-plugin/index.js',
    screenshotPath: 'D:/Angular/Reports',
    screenshotOnExpect: 'failure+success',
    screenshotOnSpec: 'failure+success',
    htmlOnExpect: 'failure+success',
    withLogs: true,
    writeReportFreq: 'asap',
    imageToAscii: 'none',
    clearFoldersBeforeTest: true
  }],


  capabilities:
    {
      directConnect: true,
      'browserName': 'chrome',

      //  shardTestFiles: false,
      //  maxInstances: 2,
      chromeOptions:
        {
          args: ['--start-maximized', 'incognito', 'disable-infobars'],
          prefs:
            {
              'browser.speechinput_tray_notification_shown_contexts': 1,
              'profile.managed_default_content_settings.popups': 1,
              'profile.managed_default_content_settings.notifications': 1,
              'profile.managed_default_content_settings.media_stream': 1,
              'profile.managed_default_content_settings.cookies': 1
            }
        },
      loggingPrefs:
        {
          browser: 'ALL'
        }
    },

  jasmineNodeOpts:
    {
      showColors: true,
      includeStackTrace: true,
      defaultTimeoutInterval: 1440000//Increase the default jasmine time
      //interval.
    },

  // specs: ['spec.js', 'spec1.js'],
  suites:
    {
      Login: 'D:/Angular/Configuration/login.js',
      CC: 'D:/Angular/Call_Center/Agent_Connect.js',
      CallConnect: 'D:/Angular/Call_Center/Call_Connect.js',
      // Interim:          'D:/Angular/Interim/gotoAngular.js',
      // General:          'D:/Angular/AngularPanel/1General/Locations.js',
      // CallRoutes:       'D:/Angular/AngularPanel/1General/Call_Routes.js',
      // PresetNotes:      'D:/Angular/AngularPanel/1General/Preset_Notes.js',
      // CampaignTemplates:'D:/Angular/AngularPanel/2Leads/Campaign_Templates.js',
      // Variables:          'D:/Angular/AngularPanel/1General/Variables.js',
      // Ads:              'D:/Angular/AngularPanel/4Marketing/Ads.js',
      Logout: 'D:/Angular/Configuration/logout.js'

    },
  framework: 'jasmine2',

  onCleanUp: function (results) {
    retry.onCleanUp(results);
  },

  onPrepare: function () {
    retry.onPrepare();
    /* HtmlScreenshotReporter = require ('protractor-jasmine2-html-reporter');
     jasmine.getEnv().addReporter (new HtmlScreenshotReporter({
  
     savePath: 'Reports',
     filename: 'LoginPage',
     fileNamePrefix: '',
     cleanDestination: false,
     ignoreSkippedSpecs: true,
     reportOnlyFailedSpecs: false,
     consolidate: false,
     consolidateAll: false,
     fixedScreenshotName: true,
     takeScreenshotsOnlyOnFailures: false
     })); */

    var jasmineReporters = require('jasmine-reporters');
    var junitReporter = new jasmineReporters.JUnitXmlReporter({
      consolidateAll: false,
      savePath: 'D:/Angular/Reports/xmlReports',
      fileNamePrefix: 'CP_',
      cleanDestination: false,
      ignoreSkippedSpecs: true,
      reportOnlyFailedSpecs: false
    })

    jasmine.getEnv().addReporter(junitReporter);

  },

  afterLaunch: function () {
    return retry.afterLaunch(2);
  }

};
