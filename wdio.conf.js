exports.config = {
  runner: 'local',

  specs: [
    './test/specs/**/*.js'
  ],
  exclude: [],

  maxInstances: 1,

  // ✅ BrowserStack
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  services: ['browserstack'],

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

  /**
   * ✅ Adiciona info de ambiente uma vez (se seu helper existir)
   */
  beforeTest: async function () {
    try {
      const allureHelper = require('./test/helpers/allureHelper');
      if (!global.envInfoAdded && allureHelper?.addEnvironmentInfo) {
        await allureHelper.addEnvironmentInfo(this.capabilities);
        global.envInfoAdded = true;
      }
    } catch (e) {
      // se não tiver helper, segue sem quebrar
    }
  },

  /**
   * ✅ Um único afterTest (unificado)
   * - tira screenshot quando falhar
   * - anexa no Allure
   * - (opcional) chama seu helper para screenshot/logs
   */
  afterTest: async function (test, context, { passed }) {
    if (passed) return;

    console.log('\n❌ Teste falhou - Capturando evidências...\n');

    // 1) Screenshot e anexar no Allure
    try {
      const screenshotBase64 = await browser.takeScreenshot();
      const allure = require('@wdio/allure-reporter').default;
      allure.addAttachment(
        `Screenshot - ${test.title}`,
        Buffer.from(screenshotBase64, 'base64'),
        'image/png'
      );
    } catch (e) {
      console.log('Aviso: não consegui anexar screenshot no Allure:', e.message);
    }

    // 2) Se você tiver helper, usa ele também (logs etc.)
    try {
      const allureHelper = require('./test/helpers/allureHelper');
      if (allureHelper?.captureScreenshotOnFailure) {
        await allureHelper.captureScreenshotOnFailure(test.title);
      }
      if (allureHelper?.captureLogs) {
        await allureHelper.captureLogs();
      }
    } catch (e) {
      // se não tiver helper, segue sem quebrar
    }
  },

  /**
   * ✅ Gera o relatório no final
   * (no GitHub Actions você pode preferir gerar no workflow, mas isso aqui funciona também)
   */
  onComplete: function () {
    const { execSync } = require('child_process');
    try {
      console.log('\n📊 Gerando relatório Allure...\n');
      execSync('npx allure-commandline generate allure-results -o allure-report --clean', { stdio: 'inherit' });
      console.log('\n✅ Relatório gerado em: ./allure-report\n');
    } catch (e) {
      console.log('Aviso: Não foi possível gerar relatório Allure');
    }
  },
};
