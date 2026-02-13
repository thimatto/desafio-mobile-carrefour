const NavigationPage = require('../pageobjects/NavigationPage')

describe('Navegação entre telas - Menu inferior', () => {
  it('deve navegar por todas as telas do app', async () => {
    await NavigationPage.goToHome()
    await NavigationPage.homeTitle.waitForDisplayed({ timeout: 10000 })

    await NavigationPage.goToWebview()
    await NavigationPage.webviewTitle.waitForDisplayed({ timeout: 10000 })

    await NavigationPage.goToLogin()
    await NavigationPage.loginTitle.waitForDisplayed({ timeout: 10000 })

    await NavigationPage.goToForms()
    await NavigationPage.formsTitle.waitForDisplayed({ timeout: 10000 })

    await NavigationPage.goToSwipe()
    await NavigationPage.swipeTitle.waitForDisplayed({ timeout: 10000 })

    await NavigationPage.goToDrag()
    await NavigationPage.dragTitle.waitForDisplayed({ timeout: 10000 })
  })
})
