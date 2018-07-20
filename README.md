# The Developer Conference Bot

Este é o passo-a-passo de como subir um chatbot em uma página web usando *Watson Assistant*, *Continuous Delivery* e *Runtime do SDK for Node.js*. Caso você não tenha uma conta na [IBM Cloud](https://bluemix.net), este é o momento de criá-la. Caso já tenha a conta, faça o login normalmente.

## Deploy do Workspace do Watson Assistant

Neste momento subiremos um workspace no Watson Assistant, isto é, um chatbot com conhecimento sobre pizza!!

### 1. [![Deploy Watson Assistant](https://bluemix.net/deploy/button.png)](https://console.bluemix.net/devops/setup/deploy?repository=https://github.com/victorshinya/chatbot-deployer&chatbotName=Chatbot&chatbotWorkspaceURL=https://github.com/victorshinya/chatbot-deployer/raw/master/data/workspace.json)

### 2. Deploy do Workspace. Aqui você deve clicar no quadrado do *Delivery Pipeline* e criar a sua API-KEY.
![Deploy Watson Assistant Workspace](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-01.02.png)
![Deploy Watson Assistant Workspace](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-01.03.png)
![Deploy Watson Assistant Workspace](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-01.04.png)

### 3. Abrir o Delivery Pipeline
![Delivery Pipeline](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-02.02.png)

### 4.Neste passo, veja se o seu deploy foi realizado, isto é, o deploy está em modo "stage passed". Se estiver como "stage not run", você deve apenas dar um play na esteira de devops conforme abaixo:
![Deploy Watson Assistant Workspace](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-02.04.png)

Uma vez que seu sistema estiver em modo "stage passed", clique no ícone IBM Cloud para acessar o dashboard com serviços criados:

### 5. IBM Cloud Dashboard
![Dashboard Bot Asset Exchange Workspaces](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-03.png)

Dentro do Toolkit do Watson Assistant criado, devemos pegar as credenciais da API. Siga as passos abaixo

### 6. Abrindo o Toolkit do Assistant
![Watson Assistant Toolkit](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-05.png)

### 7. Abrir a aba de Workspaces
![Launch Tool](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-04.png)

### 8. Selecionar o Workspace de Pizzaria
![Workspaces](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-22.png)

### 9. Ir na aba de credenciais (à esquerda a aba de seta) e copiar os valores:
![Credentials](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-23.png)

Deixe esta página aberta pois futuramente copiaremos o "Workspace ID","Username" e "Password" para deploy da página Web.

## Deploy da página Web

Neste momento subiremos uma aplicação Web para linkar a nossa API de Chatbot.

### 10.[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/ibm-code-br/tdc-bot)

### 11.Deploy da Página Web. Aqui você deve clicar no quadrado do *Delivery Pipeline* e criar a sua API-KEY.
![Deploy](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-15.02.jpeg)
![Deploy](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-15.03.jpeg)

Já que estamos subindo um projeto completo, ele pode levar um certo tempo para estar completamente disponível (Não se preocupe, não será nada mais que 3 minutos). Para isso, vamos acompanhar a esteira de deploy no Delivery Pipeline.

### 12.Abrir o Delivery Pipeline
![Delivery Pipeline](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-16.png)

Quando a aplicação estiver pronta, você poderá clicar no link conforme abaixo:

### 13.Aqui você vai ter que clicar no titulo "IBM Cloud" no canto superior esquerdo. Ele vai te direcionar para a página do Dashboard.
![Link App](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-17.02.jpeg)
![Link App](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-17.03.jpeg)

Por último, teremos que linkar as nossas credenciais, no front end. Para isso clique na "engrenagem" à direita:

### 14.Abrir a aba de configuração do Bot (engrenagem)
![Credenciais](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-18.png)

E adicione as credenciais que copiamos lá no ítem 9:

### 15. Substituir as credenciais
![Credenciais2](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-19.png)

Agora é só testar !!

### 16. Testar \o/
![Teste](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-21.png)
