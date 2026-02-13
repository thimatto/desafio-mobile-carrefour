const LoginPage = require('../pageobjects/LoginPage');

describe('Login - Fluxo completo', () => {
    beforeEach(async () => {
        // Sempre abre a aba Login antes de cada teste
        await $('~Login').click();
    });

    it('deve logar com credenciais válidas', async () => {
        await LoginPage.login('thiago@teste.com', '12345678');
        await expect(LoginPage.successMessage).toBeDisplayed();
        await LoginPage.confirmarLogin();
     });

    it('deve mostrar erro ao inserir email inválido', async () => {
        await LoginPage.login('teste', '12345678');
        await expect(LoginPage.emailError).toBeDisplayed();
    });

    it('deve mostrar erro ao inserir senha menor que 8 caracteres', async () => {
        await LoginPage.login('teste@teste.com', '12345');
        await expect(LoginPage.passwordError).toBeDisplayed();
    });

    it('deve mostrar ambos os erros juntos', async () => {
        await LoginPage.login('teste', '12345');
        await expect(LoginPage.emailError).toBeDisplayed();
        await expect(LoginPage.passwordError).toBeDisplayed();
    });
   
});
