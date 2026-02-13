class NavigationPage {
  // ===== Tabs (menu inferior) =====
  get homeTab() { return $('~Home') }
  get webviewTab() { return $('~Webview') }
  get loginTab() { return $('~Login') }
  get formsTab() { return $('~Forms') }
  get swipeTab() { return $('~Swipe') }
  get dragTab() { return $('~Drag') }

  // ===== Títulos (validação) =====
  get homeTitle() { return $('//*[contains(@text,"WEBDRIVER")]') }
  get webviewTitle() { return $('//*[contains(@text,"Next-gen")]') }
  get loginTitle() { return $('//*[contains(@text,"Login / Sign up Form")]') }
  get formsTitle() { return $('//*[contains(@text,"Form components")]') }
  get swipeTitle() { return $('//*[contains(@text,"Swipe horizontal")]') }
  get dragTitle() { return $('//*[contains(@text,"Drag and Drop")]') }

  // ===== Ações =====
  async goToHome() {
    await this.homeTab.click()
  }

  async goToWebview() {
    await this.webviewTab.click()
  }

  async goToLogin() {
    await this.loginTab.click()
  }

  async goToForms() {
    await this.formsTab.click()
  }

  async goToSwipe() {
    await this.swipeTab.click()
  }

  async goToDrag() {
    await this.dragTab.click()
  }
}

module.exports = new NavigationPage()
