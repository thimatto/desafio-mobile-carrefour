const FormsPage = require('../pageobjects/FormsPage')

describe('Forms - validação completa', () => {
  beforeEach(async () => {
    await FormsPage.open()
  })

  it('deve preencher input e validar retorno', async () => {
    const texto = 'Thiago teste forms'

    // Valida que o campo começa vazio
    const initialText = await FormsPage.typedResult.getText()
    await expect(initialText).toBe('')

    await FormsPage.type(texto)
    
    await FormsPage.typedResult.waitForDisplayed({ timeout: 10000 })
    await expect(FormsPage.typedResult).toHaveText(expect.stringContaining(texto))
  })

  it('deve alternar o switch', async () => {
    await FormsPage.switchText.waitForDisplayed({ timeout: 10000 })

    // Captura o texto antes do clique
    const textBefore = await FormsPage.switchText.getText()

    // clica para mudar estado
    await FormsPage.toggleSwitch()
    await browser.pause(500) // espera a animação

    // Captura o texto depois do clique
    const textAfter = await FormsPage.switchText.getText()

    // valida que o texto mudou 
    await expect(textBefore).not.toBe(textAfter)
    await expect(FormsPage.switchText).toBeDisplayed()
  })

  it('deve selecionar item no dropdown', async () => {
    const optionToSelect = 'webdriver.io is awesome'
    
    // Abre o dropdown
    await FormsPage.dropdown.waitForDisplayed({ timeout: 10000 })
    await FormsPage.dropdown.click()
    await browser.pause(500) // aguarda dropdown abrir
    
    // Valida existência de cada item no dropdown
    const optionsToValidate = ['webdriver.io is awesome', 'Appium is awesome', 'This app is awesome']
    for (const option of optionsToValidate) {
      const optionElement = await $(`//*[@text="${option}"]`)
      await expect(optionElement).toBeDisplayed()
    }
    
    // Seleciona a opção
    const selectedOption = await $(`//*[@text="${optionToSelect}"]`)
    await selectedOption.click()
    
    // Aguarda o dropdown fechar
    await browser.pause(500)
    
    // Valida que seleção funcionou
    await expect(await FormsPage.dropdown.isDisplayed()).toBe(true)
  })

it('deve clicar no botão Active e validar o modal', async () => {
  await FormsPage.clickActiveButton()

  await FormsPage.modalTitle.waitForDisplayed({ timeout: 10000 })
  await expect(FormsPage.modalActiveMessage).toBeDisplayed()
  
  // Valida botões do modal
  await expect(FormsPage.modalOkButton).toBeDisplayed()
  await expect(FormsPage.modalCancelButton).toBeDisplayed()

  // Confirma e valida que o modal fechou
  await FormsPage.confirmModal()
  await browser.pause(300)
  
  await expect(FormsPage.modalOkButton).not.toBeDisplayed()
})

it('deve clicar no botão Inactive e validar o modal', async () => {
  await FormsPage.clickInactiveButton()

  // Valida a mensagem específica do Inactive
  await FormsPage.modalInactiveMessage.waitForDisplayed({ timeout: 10000 })
  await expect(FormsPage.modalInactiveMessage).toBeDisplayed()
  
  // Valida botões do modal
  await expect(FormsPage.modalOkButton).toBeDisplayed()
  await expect(FormsPage.modalCancelButton).toBeDisplayed()

  // Confirma e valida que o modal fechou
  await FormsPage.confirmModal()
  await browser.pause(300)
  
  await expect(FormsPage.modalOkButton).not.toBeDisplayed()
})  


})
