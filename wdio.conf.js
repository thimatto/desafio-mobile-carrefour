exports.config = {
    runner: 'local',

    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],

    maxInstances: 1,

    capabilities: [
        {
            platformName: 'Android',
            'appium:deviceName': 'Google Pixel 7',
            'appium:platformVersion': '13.0',
            'appium:automationName': 'UiAutomator2',
            'appium:app': 'bs://d2396ccbe7626696acc102a9a7dbdc6b81c08449'
        }
    ],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    // 🔑 Apenas BrowserStack
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: ['browserstack'],


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

    // 🎯 Hooks para capturar screenshots de falhas e logs
    beforeTest: async function(test) {
        const allureHelper = require('./test/helpers/allureHelper');
        // Adiciona informações do ambiente no primeiro teste
        if (!global.envInfoAdded) {
            await allureHelper.addEnvironmentInfo(this.capabilities);
            global.envInfoAdded = true;
        }
    },

    afterTest: async function(test, context, { passed, failed, error }) {
        const allureHelper = require('./test/helpers/allureHelper');
        
        // Se o teste falhou, captura screenshot e logs
        if (!passed) {
            console.log('\n❌ Teste falhou - Capturando evidências...\n');
            await allureHelper.captureScreenshotOnFailure(test.title);
            await allureHelper.captureLogs();
        }
    },

    onComplete: function() {
        const { execSync } = require('child_process');
        try {
            console.log('\n📊 Gerando relatório Allure...\n');
            execSync('allure generate allure-results -o allure-report --clean', { stdio: 'inherit' });
            console.log('\n✅ Relatório gerado em: ./allure-report\n');
        } catch (e) {
            console.log('Aviso: Não foi possível gerar relatório Allure');
        }
    },
    afterTest: async function (test, context, { error, passed }) {

    // Se o teste falhou
    if (!passed) {

        // tira screenshot
        const screenshot = await browser.takeScreenshot();

        // adiciona no relatório Allure
        const allure = require('@wdio/allure-reporter').default;
        allure.addAttachment(
            'Screenshot on failure',
            Buffer.from(screenshot, 'base64'),
            'image/png'
        );
    }
},


    
};
