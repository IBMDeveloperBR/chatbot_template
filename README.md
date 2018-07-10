# The Developer Conference Bot

Este é o passo-a-passo de como subir um chatbot em uma página web usando *Watson Assistant*, *Continuous Delivery* e *Runtime do SDK for Node.js*. Caso você não tenha uma conta na [IBM Cloud](https://bluemix.net), este é o momento de criá-la. Caso já tenha a conta, faça o login normalmente.

## Deploy do Workspace do Watson Assistant

[![Deploy Watson Assistant](https://bluemix.net/deploy/button.png)](https://console.bluemix.net/devops/setup/deploy?repository=https://github.com/victorshinya/chatbot-deployer&chatbotName=Chatbot&chatbotWorkspaceURL=https://github.com/victorshinya/chatbot-deployer/raw/master/data/workspace.json)

![Deploy Watson Assistant Workspace](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-01.png)

![Delivery Pipeline](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-02.02.png)

Neste passo, veja se o seu deploy foi realizado, isto é, o deploy está em modo "stage passed". Se estiver como "stage not run", você deve apenas dar um play na esteira de devops conforme abaixo:

![Deploy Watson Assistant Workspace](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-02.04.png)

Uma vez que seu sistema estiver em modo "stage passed", clique no ícone IBM Cloud para acessar o dashboard com serviços criados:

![Dashboard Bot Asset Exchange Workspaces](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-03.png)

Dentro do Toolkit do Watson Assistant criado, devemos pegar as credenciais da API. Siga as passos abaixo

![Watson Assistant Toolkit](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-05.png)

![Launch Tool](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-04.png)

![Workspaces](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-06.png)

![Credentials](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-07.png)

Deixe esta página aberta pois futuramente copiaremos o "Workspace ID","Username" e "Password" para deploy da página Web.

## Deploy da página Web

Neste momento subiremos uma aplicação Web para linkar a nossa API de Chatbot.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/ibm-code-br/tdc-bot)

![Deploy](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-15.png)

Já que estamos subindo um projeto completo, ele pode levar um certo tempo para estar completamente disponível (Não se preocupe, não será nada mais que 2 minutos). Para isso, vamos acompanhar a esteira de deploy no Delivery Pipeline.

![Delivery Pipeline](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-16.png)

Quando a aplicação estiver pronta, você poderá clicar no link conforme abaixo:

![Link App](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-17.png)

Por último, teremos que linkar as nossas credenciais, no front end. Para isso clique na "engrenagem" à esquerda:

![Credenciais](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-18.png)

E adicione as credenciais que copiamos lá no ítem X:

![Credenciais2](https://github.com/ibm-code-br/tdc-bot/raw/master/print/tutorial-chatbot-19.png)
