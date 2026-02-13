class FormsPage {
  // Aba
  get formsTab() { return $('~Forms') }

  // Título
  get title() { return $('//*[contains(@text,"Form components")]') }

  // Input field
  get inputField() { return $('~text-input') } //  
  get typedResult() { return $('~input-text-result') } // resultado abaixo de "You have typed:"

  // Switch
  get switch() { return $('~switch') }
  get switchText() { return $('~switch-text') } // "click ON/OFF"

  
  // Dropdown
  get dropdown() { return $('~Dropdown') } // às vezes é accessibility id do container
  get dropdownValue() { return $('~text-input') }  

  // Buttons
  get btnActive() { return $('~button-Active') }
  get btnInactive() { return $('~button-Inactive') }

//  Modal 
  get modalTitle() { return $('//*[contains(@text,"This button is")]') }
  get modalActiveMessage() { return $('//*[contains(@text,"This button is active")]') }
  get modalInactiveMessage() { return $('//*[contains(@text,"This button is inactive")]') }
  get modalOkButton() { return $('//*[@text="OK"]') }
  get modalCancelButton() { return $('//*[@text="CANCEL"]') }

  async open() {
    await this.formsTab.click()
    await this.title.waitForDisplayed({ timeout: 10000 })
  }

  async type(text) {
    await this.inputField.waitForDisplayed({ timeout: 10000 })
    await this.inputField.setValue(text)
  }

  async toggleSwitch() {
    await this.switch.waitForDisplayed({ timeout: 10000 })
    await this.switch.click()
  }

async selectFromDropdown(optionText) {
  await this.dropdown.waitForDisplayed({ timeout: 10000 })
  await this.dropdown.click()

  const option = await $(`//*[@text="${optionText}"]`)
  await option.waitForDisplayed({ timeout: 10000 })
  await option.click()
}

async clickActiveButton() {
  await this.btnActive.waitForDisplayed({ timeout: 10000 })
  await this.btnActive.click()
}

async clickInactiveButton() {
  await this.btnInactive.waitForDisplayed({ timeout: 10000 })
  await this.btnInactive.click()
}

async confirmModal() {
  await this.modalOkButton.waitForDisplayed({ timeout: 10000 })
  await this.modalOkButton.click()
}
}

module.exports = new FormsPage()

