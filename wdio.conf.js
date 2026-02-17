exports.config = {
  runner: 'local',

  specs: [
    './test/specs/**/*.js'
  ],

  maxInstances: 1,

  // 🔐 Credenciais
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,

  // 🌐 Conexão direta com BrowserStack (SEM service)
  hostname: 'hub-cloud.browserstack.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',

  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'Google Pixel 7',
      'appium:platformVersion': '13.0',
      'appium:automationName': 'UiAutomator2',
      'appium:app': 'bs://d2396ccbe7626696acc102a9a7dbdc6b81c08449',

      'bstack:options': {
        projectName: 'Carrefour Mobile',
        buildName: `GH Actions - ${process.env.GITHUB_RUN_NUMBER || 'local'}`,
        sessionName: 'WDIO Appium Tests',
        debug: true,
        networkLogs: true
      }
    }
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',

  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
    }],
  ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  afterTest: async function (test, context, { passed }) {
    if (passed) return;

    const screenshotBase64 = await browser.takeScreenshot();
    const allure = require('@wdio/allure-reporter').default;

    allure.addAttachment(
      `Screenshot - ${test.title}`,
      Buffer.from(screenshotBase64, 'base64'),
      'image/png'
    );
  },

  onComplete: function () {
    const { execSync } = require('child_process');
    try {
      execSync(
        'npx allure-commandline generate allure-results -o allure-report --clean',
        { stdio: 'inherit' }
      );
    } catch (e) {
      console.log('Não foi possível gerar relatório Allure');
    }
  },
};
