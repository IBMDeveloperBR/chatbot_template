let express = require('express');
let chalk = require('chalk');
let bodyParser = require('body-parser');
let request = require('request');
let path = require('path');
let http = require('http');



const port = process.env.PORT || 3000;
let app = express();

let chatbot = null;

let methodOverride = require('method-override');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));
app.use('/img', express.static(path.join(__dirname, '/views/img')));
app.use('/js', express.static(path.join(__dirname, '/views/js')));



app.get('/', (req, res) => {
    res.render('index.html');
})

app.post('/api/conversation', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const configurations = req.body.configurations;
    switch (configurations['type']) {

        case 'Built-in-Conversation':
            builtInConversation(req, res);
            break;
        case 'Custom-Conversation':
            customConversation(req, res);
            break;

        case 'Node-Red':
            nodeRed(req, res);
            break;

    }

})

const processChatMessage = (req, res, bot) => {
    bot.sendMessage(req, (err, data) => {
        if (err) {
            console.log("Error in sending message: ", err);
            res.status(err.code || 500).json(err);
        } else {
            console.log('Got response: ', JSON.stringify(data));
            res.status(200).json(data);
        }
    });
}



const builtInConversation = (req, res) => {

    console.log('Built in conversation api invoked method..');

    const configurations = req.body.configurations;
    const params = req.body.params;

    if (chatbot != null && chatbot.isInitialized()) {
        processChatMessage(req, res, chatbot);
    } else {

        chatbot = require('./config/bot.js');

        chatbot.init(response => {
            if (!response.error) {
                processChatMessage(req, res, chatbot);
            } else {
                errorResponse(res, 500, 'Internal server error');
            }
        })
    }
}




const customConversation = (req, res) => {

    console.log('Custom conversation method invoked..');
    const configurations = req.body.configurations;
    const params = req.body.params;
    const authentication_key = new Buffer(`${configurations['username']}:${configurations['password']}`).toString('base64');

    const options = {
        url: `https://gateway.watsonplatform.net/conversation/api/v1/workspaces/${configurations['workspace_id']}/message?version=2017-05-26`,
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authentication_key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }

    request(options, (error, response, body) => {

        if (!error && response.statusCode == 200) {
            res.status(200).json(JSON.parse(body));
        } else {
            res.status(400).json({ error: true })
        }
    })
}

const nodeRed = (req, res) => {
    console.log('Node red method invoked..');
    const configurations = req.body.configurations;
    const params = req.body.params;
    const postData = {
        params: params
    }
    let options = {
        url: configurations['url'],
        method: 'POST',
        json: true,
        headers: {
            'Content-Type': 'application/json'
        },
        body: postData
    }

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log('Got response from Node-Red..');
            res.status(200).json(body);
        } else {
            console.log('Node red error');
            console.log(error);
            res.status(500).json({ error: true });
        }

    })
}


const errorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({ error: true, description: message, statusCode });
}



http.createServer(app).listen(app.get('port'), '0.0.0.0', function () {
    console.log(chalk.cyan('Express server listening on port ' + app.get('port')));
})