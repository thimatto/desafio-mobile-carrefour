/**
 * Helper para integrar Allure com capturas de screenshot e logs
 */

class AllureHelper {
  /**
   * Captura screenshot em caso de falha
   */
  async captureScreenshotOnFailure(testName) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `failure-${testName}-${timestamp}.png`;
      const filepath = `./allure-results/screenshots/${filename}`;
      
      await browser.saveScreenshot(filepath);
      await allure.addAttachment('Screenshot de Falha', filepath, 'image/png');
      console.log(`✓ Screenshot capturado: ${filename}`);
    } catch (error) {
      console.log(`⚠ Não foi possível capturar screenshot: ${error.message}`);
    }
  }

  /**
   * Captura logs de execução
   */
  async captureLogs() {
    try {
      const logs = await browser.getLogs('driver');
      if (logs && logs.length > 0) {
        const logContent = logs
          .map(log => `[${log.level}] ${log.message}`)
          .join('\n');
        
        await allure.addAttachment('Logs de Execução', logContent, 'text/plain');
        console.log(`✓ ${logs.length} logs capturados`);
      }
    } catch (error) {
      console.log(`⚠ Não foi possível capturar logs: ${error.message}`);
    }
  }

  /**
   * Adiciona informações de ambiente ao relatório
   */
  async addEnvironmentInfo(capabilities) {
    const envInfo = {
      'Platform': capabilities.platformName,
      'Device': capabilities['appium:deviceName'],
      'OS Version': capabilities['appium:platformVersion'],
      'Automation': capabilities['appium:automationName'],
      'Timestamp': new Date().toISOString(),
      'Browser Stack': 'Sim'
    };

    const envContent = Object.entries(envInfo)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    await allure.addAttachment('Informações do Ambiente', envContent, 'text/plain');
  }

  /**
   * Adiciona evidência customizada ao relatório
   */
  async addEvidence(title, content, mimeType = 'text/plain') {
    try {
      await allure.addAttachment(title, content, mimeType);
    } catch (error) {
      console.log(`⚠ Erro ao adicionar evidência: ${error.message}`);
    }
  }

  /**
   * Cria um passo com screenshot
   */
  async stepWithScreenshot(stepName) {
    await allure.step(stepName);
    try {
      const timestamp = Date.now();
      const screenshotPath = `./allure-results/screenshots/step-${stepName}-${timestamp}.png`;
      await browser.saveScreenshot(screenshotPath);
      await allure.addAttachment(`Step: ${stepName}`, screenshotPath, 'image/png');
    } catch (error) {
      console.log(`⚠ Erro ao capturar screenshot do passo: ${error.message}`);
    }
  }
}

module.exports = new AllureHelper();
