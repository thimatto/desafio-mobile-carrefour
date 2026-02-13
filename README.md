# WebdriverIO Demo App for iOS and Android

This app is built with [Expo](https://expo.dev/) and React Native, and will be used for test automation purposes for the [appium-boilerplate](https://github.com/webdriverio/appium-boilerplate).

https://user-images.githubusercontent.com/11979740/118520294-3fb8e480-b73a-11eb-9100-dccecbb683cc.mov

## Downloads
Different releases of the iOS and Android app can be downloaded [here](https://github.com/webdriverio/native-demo-app/releases)

> [!NOTE]
> The Android app can be installed on Android emulators and physical devices. The iOS app can **ONLY** be installed on iOS simulators. There is no build available for physical iOS devices due to not being able to install this app on physical iPhones. This is a (security) limitation from Apple.

## Features
This app can/will be used for the [appium-boilerplate](https://github.com/webdriverio/appium-boilerplate) so (new) users 
of WebdriverIO and Appium can play around.
How WebdriverIO and Appium can be used together can be found there, here you will only find the code to build the app.

The app holds the following screens:
- **:house: Home:** The intro of the app
- **:spider_web: WebView:** Clicking on the WebView tab will open the WebdriverIO website (**only once**). It is created to test for 
  example switching context and interacting with the WebView
- **:closed_lock_with_key: Login:** This screen contains a simple Login / Sign Up screen with validations and alerts. If Touch/FaceId for iOS
  or Fingerprint for Android is enabled, then you will also be able to test that.
- **:page_facing_up: Forms:** This screen holds some basic form elements to interact with like:
  - **Input**
  - **Switch**
  - **DropDown**
  - **Button**
- **:pinching_hand:	Swipe:** This screen will hold a carousel so horizontal swiping can be tested. It can also be used to test vertical
  swiping
- **:pinching_hand:	Drag:** This screen holds a simple puzzle. The puzzle can be solved by dragging the pieces into the main image.

## 🧪 Testes Automatizados

Este projeto inclui testes E2E automatizados usando **WebdriverIO** e **Appium**, com relatórios visuais gerados pelo **Allure**.

### Pré-requisitos

Antes de executar os testes, certifique-se de ter:
- **Node.js** >= 18.x LTS
- **npm** >= 9.x
- **Java Development Kit (JDK)** >= 11 (para Android)
- **Android SDK** (para testes em emulador/dispositivo Android)
- **Conta BrowserStack** (para testes em cloud)

### Configuração do Ambiente

#### 1. **Instalar Dependências**
```bash
npm install
```

#### 2. **Configurar Credenciais BrowserStack**

Crie um arquivo `.env` na raiz do projeto ou exporte as variáveis de ambiente:

```bash
# .env file
BROWSERSTACK_USERNAME=seu_usuario
BROWSERSTACK_ACCESS_KEY=sua_chave_acesso
```

Ou via linha de comando:
```bash
export BROWSERSTACK_USERNAME=seu_usuario
export BROWSERSTACK_ACCESS_KEY=sua_chave_acesso
```

Verifique suas credenciais em: https://www.browserstack.com/accounts/settings

#### 3. **Verificar Instalação WebdriverIO**
```bash
npx wdio --version
```

### Estrutura dos Testes

```
test/
├── pageobjects/          # Page Object Models (padrão POM)
│   ├── FormsPage.js
│   ├── LoginPage.js
│   └── NavigationPage.js
├── specs/                # Especificações de testes
│   ├── forms.spec.js
│   ├── login.spec.js
│   └── navigation.spec.js
└── helpers/              # Utilitários de teste
    └── allureHelper.js   # Helper de relatório Allure
```

### Executando Testes

#### **Quick Start - Executar Todos os Testes com Relatório Allure**
```bash
npm run wdio:allure
```
Este comando executa os testes e abre automaticamente o relatório Allure no navegador.

#### **Executar Apenas os Testes (Sem Relatório)**
```bash
npm run wdio
```

#### **Executar Arquivo de Teste Específico**
```bash
npx wdio run ./wdio.conf.js --spec ./test/specs/forms.spec.js
```

#### **Gerar Relatório a partir de Resultados Existentes**
```bash
npm run allure:report
```

#### **Abrir Relatório Já Gerado**
```bash
npm run allure:open
```

### Arquivos de Teste

| Arquivo | Descrição | Testes |
|---------|-----------|--------|
| **forms.spec.js** | Componentes de formulário (input, switch, dropdown, modal) | 4 testes |
| **login.spec.js** | Funcionalidade de login e validação | 4 testes |
| **navigation.spec.js** | Navegação entre telas do app | 1 teste |

### Detalhes das Especificações de Testes

#### Testes de Formulário
- ✅ Campo input: digitação e validação de valor
- ✅ Switch: alternância de estado e mudança de texto
- ✅ Dropdown: seleção de opções
- ✅ Modal: abertura, exibição de botões e fechamento

#### Testes de Login
- ✅ Login com credenciais válidas
- ✅ Erros de validação de email
- ✅ Erros de validação de senha
- ✅ Múltiplos erros de validação simultâneos

#### Testes de Navegação
- ✅ Fluxo completo de navegação por todas as telas do app

### 📊 Relatórios Allure

Allure gera relatórios abrangentes de testes com:

**Funcionalidades:**
- ✅ Resumo da execução (passou, falhou, pulado)
- 📸 Screenshots de falhas
- 📝 Logs de execução
- 🏢 Informações de ambiente
- 📊 Timeline de execução
- 📈 Gráficos estatísticos
- 🔖 Organização de testes por feature/story

**Localizações dos Relatórios:**
- **Dados brutos:** `./allure-results/` (formato JSON)
- **Relatório HTML:** `./allure-report/index.html`
- **Screenshots:** `./allure-results/screenshots/`

**Gerar e Visualizar:**
```bash
# Gerar relatório
npm run allure:report

# Abrir no navegador
npm run allure:open
```

### Screenshots nos Relatórios

Screenshots são capturados automaticamente quando:
- ❌ Um teste falha
- ✅ Cada passo do teste é documentado
- 🎯 Captura manual: `await browser.saveScreenshot('./caminho/para/screenshot.png')`

### Informações de Ambiente

Cada relatório de teste inclui:
- **Plataforma:** Android
- **Dispositivo:** Google Pixel 7
- **Versão do SO:** 13.0
- **Engine de Automação:** UiAutomator2
- **Timestamp de Execução:** Data e hora da execução do teste
- **Integração BrowserStack:** Detalhes de conexão

### Configuração BrowserStack

Os testes são configurados para executar no **BrowserStack** (plataforma de testes em cloud):

**Configuração Atual:**
- Plataforma: Android
- Dispositivo: Google Pixel 7
- SO: Android 13.0
- Automação: UiAutomator2

**Atualizar em `wdio.conf.js`:**
```javascript
capabilities: [
  {
    platformName: 'Android',
    'appium:deviceName': 'Google Pixel 7',
    'appium:platformVersion': '13.0',
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'bs://SEU_APP_HASH_AQUI'
  }
]
```

### Debugando Testes

#### Habilitar Logging Verboso
Edite `wdio.conf.js`:
```javascript
logLevel: 'debug', // Mude de 'info' para 'debug'
```

#### Salvar Screenshots para Debug
```javascript
// No seu teste
await browser.saveScreenshot('./debug-screenshot-' + Date.now() + '.png');
```

#### Visualizar Logs WebdriverIO
```bash
tail -f wdio.log
```

### Solução de Problemas

#### ❌ "Module not found: @wdio/allure-reporter"
**Solução:** Reinstale as dependências
```bash
npm install
```

#### ❌ "Allure command not found"
**Solução:** Instale globalmente
```bash
npm install -g allure-commandline
```

#### ❌ Testes expiram (timeout)
**Aumentar timeout em `wdio.conf.js`:**
```javascript
mochaOpts: {
  timeout: 120000  // 120 segundos
}
```

#### ❌ Falha na conexão BrowserStack
**Verifique:**
1. Se as variáveis de ambiente estão configuradas corretamente
2. Se o username e access key do BrowserStack são válidos
3. Status do BrowserStack: https://www.browserstack.com/status
4. Sua conexão com a internet

#### ❌ Screenshots não aparecem no relatório
**Verifique:**
- Pasta `allure-results/screenshots/` existe e tem arquivos
- Permissões de arquivo estão corretas
- Execute `npm run allure:report` novamente

#### ❌ Testes executam mas relatório está vazio
**Solução:** Allure pode precisar de reconstrução limpa
```bash
rm -rf allure-results/
npm run wdio
npm run allure:report
```

### Fluxo de Execução do Teste

```
1. npm run wdio:allure
         ↓
2. WebdriverIO inicializa
         ↓
3. Conecta ao BrowserStack
         ↓
4. Executa cada spec de teste
         ↓
5. Em caso de falha: captura screenshot + logs
         ↓
6. Coleta todos os metadados
         ↓
7. Gera relatório Allure
         ↓
8. Abre relatório no navegador
```

### Dicas de Performance

- ✅ Executar testes em paralelo: ajuste `maxInstances` em `wdio.conf.js`
- ✅ Usar page object models para reduzir duplicação de código (já implementado)
- ✅ Adicionar implicit waits estrategicamente
- ✅ Evitar sleeps hard-coded, use `waitForDisplayed()`

### Integração CI/CD

Para integrar com pipelines CI/CD:

```yaml
# Exemplo GitHub Actions
- name: Executar Testes E2E
  run: npm run wdio:allure
  env:
    BROWSERSTACK_USERNAME: ${{ secrets.BS_USERNAME }}
    BROWSERSTACK_ACCESS_KEY: ${{ secrets.BS_ACCESS_KEY }}

- name: Fazer Upload do Relatório Allure
  uses: actions/upload-artifact@v2
  with:
    name: allure-report
    path: allure-report/
```

### Recursos Adicionais

- 📖 [Documentação WebdriverIO](https://webdriver.io/)
- 📖 [Documentação Appium](https://appium.io/)
- 📖 [Allure Reports](https://docs.qameta.io/allure/)
- 📖 [BrowserStack Mobile Testing](https://www.browserstack.com/app-automate)
- 📖 [Guia de Configuração Allure](./docs/ALLURE_SETUP.md)

---

## Contributing
Please read [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details on our process for submitting pull requests to us or
building an app release for Android Emulators/Real devices or an iOS Simulator.

## Versioning
We use [SemVer](https://semver.org/) for versioning, see [VERSIONING.md](./docs/VERSIONING.md) for more information.

## Built With
- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/) for navigation
