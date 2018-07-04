# The Developer Conference Bot

Este é o passo-a-passo de como subir um chatbot em uma página web usando *Watson Assistant*, *Continuous Delivery* e *Runtime do SDK for Node.js*. Caso você não tenha uma conta na [IBM Cloud](https://bluemix.net), este é o momento de criá-la. Caso já tenha a conta, faça o login normalmente.

## Deploy do Workspace do Watson Assistant

[![Deploy Watson Assistant](https://bluemix.net/deploy/button.png)](https://console.bluemix.net/devops/setup/deploy?repository=https://github.com/victorshinya/chatbot-deployer&chatbotName=Chatbot&chatbotWorkspaceURL=https://github.com/victorshinya/chatbot-deployer/raw/master/data/workspace.json)

![Deploy Watson Assistant Workspace](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-01.png)

![Delivery Pipeline](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-02.02.png)

![Deploy Watson Assistant Workspace](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-02.03.png)

![Dashboard Bot Asset Exchange Workspaces](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-03.png)

Dentro do Toolkit do Watson Assistant criado, devemos pegar as credenciais da API. Siga as passos abaixo

![Watson Assistant Toolkit](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-05.png)

![Launch Tool](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-04.png)

![Workspaces](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-06.png)

![Credentials](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-07.png)

Deixe esta página aberta pois futuramente copiaremos o "Workspace ID","Username" e "Password" para deploy da página Web.

## Deploy da página Web

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/victorshinya/pizza)

![Deploy](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-08.png)

![Toolchain](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-09.png)

Devemos abrir a Web IDE, substituir as credenciais (que copiamos anteriormente do Watson Assistant) na pasta .env e criar as configurações de launching.

![Eclipse Orion Web IDE](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-14.png)

![Configuração de Ativação](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-11.png)

![Botão Play e Abrir página Web](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-12.png)

![Seu BOT](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-13.png)
