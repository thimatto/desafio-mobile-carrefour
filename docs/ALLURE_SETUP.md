# 📊 Guia de Uso - Allure Reports

## 📋 O que é Allure?

Allure é uma framework de geração de relatórios para testes automatizados que permite:
- ✅ Resumo dos testes (passou, falhou, pulado)
- 📸 Screenshots das falhas
- 📝 Logs de execução
- 🏢 Informações do ambiente
- 📊 Gráficos e estatísticas
- 🔖 Organização por features, stories e severidade

---

## 🚀 Como Executar Testes com Allure

### 1. **Executar testes e gerar relatório automaticamente:**
```bash
npm run wdio:allure
```
Este comando:
- Executa os testes
- Coleta as evidências (screenshots, logs)
- Gera o relatório HTML
- Abre o relatório automaticamente no navegador

### 2. **Executar apenas os testes (sem abrir relatório):**
```bash
npm run wdio
```

### 3. **Gerar relatório após já ter executado testes:**
```bash
npm run allure:report
```

### 4. **Abrir relatório já gerado:**
```bash
npm run allure:open
```

---

## 📁 Estrutura de Arquivos

```
projeto/
├── allure-results/          # Dados brutos dos testes (gerado automaticamente)
│   ├── screenshots/         # Screenshots capturados
│   └── *.json              # Resultados em JSON
├── allure-report/          # Relatório HTML (gerado automaticamente)
│   └── index.html          # Abra este arquivo no navegador
└── test/
    ├── helpers/
    │   └── allureHelper.js  # Helper customizado do Allure
    └── specs/
        └── forms.spec.js    # Testes com anotações Allure
```

---

## 🎯 Anotações Utilizadas nos Testes

### Exemplo de teste com Allure:

```javascript
it('deve preencher input e validar retorno', async () => {
  // Metadados do teste
  await allure.story('Validar digitação em campo input')
  await allure.severity('blocker')  // blocker | critical | normal | minor | trivial
  await allure.description('Descrição completa do que o teste faz')

  // Passos do teste com evidências
  const texto = 'Thiago teste forms'
  
  await allure.step('Campo resultado começa vazio')
  const initialText = await FormsPage.typedResult.getText()
  await expect(initialText).toBe('')

  await allure.step(`Digitado: "${texto}"`)
  await FormsPage.type(texto)

  await allure.step('Texto contém valor digitado')
  await FormsPage.typedResult.waitForDisplayed({ timeout: 10000 })
  await expect(FormsPage.typedResult).toHaveText(expect.stringContaining(texto))
})
```

### Tags do Allure Disponíveis:

| Tag | Função | Exemplo |
|-----|--------|---------|
| `allure.feature()` | Agrupa por feature/funcionalidade | `await allure.feature('Formulários')` |
| `allure.suite()` | Suite de testes | `await allure.suite('Forms - Validação')` |
| `allure.story()` | História/caso de uso | `await allure.story('Validar digitação')` |
| `allure.severity()` | Severidade do teste | `await allure.severity('critical')` |
| `allure.description()` | Descrição detalhada | `await allure.description('...')` |
| `allure.step()` | Passo do teste | `await allure.step('Descrição do passo')` |
| `allure.addAttachment()` | Adiciona arquivo/evidência | `await allure.addAttachment('Nome', 'conteúdo', 'tipo')` |

---

## 🎯 Severidade do Teste

```
blocker      → Bloqueia toda a feature
critical     → Funcionalidade crítica não funciona
normal       → Funcionalidade padrão não funciona
minor        → Funcionalidade menor não funciona
trivial      → Problemas cosméticos
```

---

## 📸 O Que é Capturado Automaticamente

### Quando um teste **falha**:
✅ Screenshot do momento da falha  
✅ Stack trace do erro  
✅ Logs de execução  
✅ Informações do device/ambiente  

### Em cada teste:
✅ Nome e descrição  
✅ Feature e Story  
✅ Severidade  
✅ Passos executados  
✅ Tempo de execução  

---

## 📊 Visualizando o Relatório

### Acesse o relatório em:
```
./allure-report/index.html
```

### Abas disponíveis:

1. **Overview** - Dashboard com estatísticas gerais
2. **Suites** - Organizado por suite de testes
3. **Graphs** - Gráficos de cobertura e distribuição
4. **Timeline** - Ordem de execução dos testes
5. **History** - Histórico de execuções anteriores

---

## 🛠️ Helper Customizado - AllureHelper

Está disponível em `test/helpers/allureHelper.js` com funções auxiliares:

```javascript
const allureHelper = require('../helpers/allureHelper');

// Capturar screenshot em falha
await allureHelper.captureScreenshotOnFailure('meu-teste');

// Capturar logs
await allureHelper.captureLogs();

// Adicionar evidência customizada
await allureHelper.addEvidence('Título', 'conteúdo', 'text/plain');

// Criar passo com screenshot
await allureHelper.stepWithScreenshot('meu-passo');

// Adicionar informações do ambiente
await allureHelper.addEnvironmentInfo(capabilities);
```

---

## 🔍 Troubleshooting

### ❌ "Allure command not found"
```bash
# Instale globalmente
npm install -g allure-commandline
```

### ❌ Relatório não é gerado
```bash
# Verifique a pasta allure-results
ls allure-results/

# Force limpeza e regeneração
npm run allure:report
```

### ❌ Screenshots não aparecem
- Certifique-se de que `allure-results/screenshots/` existe
- Verifique permissões de escrita na pasta
- Veja os logs em `./allure-results/*.json`

---

## 💡 Dicas Importantes

1. **Sempre use steps descritivos** para facilitar a leitura do relatório
2. **Screenshots automáticos** são capturados em falhas, mas você pode adicionar mais manualmente
3. **Organize por features** usando `beforeEach` + `allure.feature()`
4. **Use severidade apropriada** para priorizar correções
5. **Limpe resultados antigos** com `npm run allure:report` (inclui flag `--clean`)

---

## 📚 Referência

- [Documentação Oficial Allure](https://docs.qameta.io/allure/)
- [WebdriverIO Allure Reporter](https://webdriver.io/docs/allure-reporter/)
- [Allure CLI](https://docs.qameta.io/allure-cli/)

---

**Gerado em:** 2026-02-12  
**Versão:** 1.0.0
