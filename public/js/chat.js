// import { xhrGet, xhrPost } from '../api/xhr.js';
// import * as util from './util.js';


let params = {
        input: {}
    },
    context = {
        timezone: "America/Sao_Paulo"
    };


const userMessage = (message) => {

    params.input.text = (message != '')? message: ' ';
    params.context = context;


    let data = {
        params: params,
        configurations: getSession('configurations')['services']['conversation']
    }

    xhrPost('/api/conversation', data , response => {
        // response = JSON.parse(response);
        let text = response.output.text;
        context = response.context;
        text.forEach( (txt) => {
            displayMessage(txt, 'watson');
        })

    }, err => {
        console.log('Error: ', err) // eslint-disable-line no-console
        displayMessage("Um error ocorreu! tente novamente por favor.", 'watson');
    })

}


const sendMessage = (event) => {

    if (event.which === 13 || event.keyCode === 13) {
        let userInput = document.getElementById('chat_input');
        let text = userInput.value;
        text = text.replace(/(\r\n|\n|\r)/gm, "");
        if (text) {
            displayMessage(text, 'user');
            userInput.value = '';
            userMessage(text);
        } else {
            userInput.value = '';
            return false;
        }
    }
}

const displayMessage = (message, user) => {
    let chat_body = document.getElementById('chat_body');
    let bubble = document.createElement('div');
    bubble.setAttribute("class", "bubble " + user);
    bubble.innerHTML = message;
    chat_body.appendChild(bubble);
    chat_body.scrollTop = chat_body.scrollHeight;
}



 
const resetContext = () => {
    context = {
        timezone: "America/Sao_Paulo"
    };
}