class LoginPage {
    // Campos
    get inputEmail() { return $('~input-email'); }
    get inputPassword() { return $('~input-password'); }
    get btnLogin() { return $('~button-LOGIN'); }

    // Mensagens
    get successMessage() { return $('android=new UiSelector().textContains("You are logged in!")'); }
    get btnOk() { return $('android=new UiSelector().resourceId("android:id/button1")'); }
    get emailError() { return $('android=new UiSelector().textContains("Please enter a valid email address")'); }
    get passwordError() { return $('android=new UiSelector().textContains("Please enter at least 8 characters")'); }

    // Ações
    async login(email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

async confirmarLogin() {
    await this.btnOk.waitForDisplayed({ timeout: 5000 });
    await this.btnOk.click();
}


}

module.exports = new LoginPage();
