


const radioToggle = () => {


    let node_red_radio = document.getElementById('node_red');
    let conv_radio = document.getElementById('custom_conversation');
    if (node_red_radio.checked) {
        removeClass('node_red_uri_holder', 'hide');
        addClass('conv_username_holder', 'hide');
        addClass('conv_password_holder', 'hide');
        addClass('conv_workspace_holder', 'hide');

    } else if (conv_radio.checked) {
        addClass('node_red_uri_holder', 'hide');
        removeClass('conv_username_holder', 'hide');
        removeClass('conv_password_holder', 'hide');

        removeClass('conv_workspace_holder', 'hide');
    } else {
        addClass('node_red_uri_holder', 'hide');
        addClass('conv_username_holder', 'hide');
        addClass('conv_password_holder', 'hide');
        addClass('conv_workspace_holder', 'hide');
    }
}



const preLoadServicesData = () => {

    
    // check for local session saved config.
    // it is always different than null, as the initialization config use session.
    let configurations = getSession('configurations');
    let config = configurations['services']['conversation'];
    // --- Reset --- 
    let red_radio = document.getElementById('node_red');
    let conv_radio = document.getElementById('custom_conversation');
    let conv_built_in = document.getElementById('built_in_conv');

    addClass('node_red_uri_holder', 'hide');
    addClass('conv_username_holder', 'hide');
    addClass('conv_password_holder', 'hide');
    addClass('conv_workspace_holder', 'hide');

    red_radio.checked = false;
    conv_radio.checked = false;
    conv_built_in.checked = false;

    if (config['type'] === 'Node-Red') {
        red_radio.checked = true;
        document.getElementById('node_red_uri').value = config['url'];
        removeClass('node_red_uri_holder', 'hide');
    } else if (config['type'] === 'Custom-Conversation') {
        conv_radio.checked = true;
        document.getElementById('conv_username').value = config['username'];
        document.getElementById('conv_password').value = config['password'];
        document.getElementById('conv_workspace').value = config['workspace_id'];
        removeClass('conv_username_holder', 'hide');
        removeClass('conv_password_holder', 'hide');
        removeClass('conv_workspace_holder', 'hide');
    } else {
        conv_built_in.checked = true;
    }

    document.getElementById('remember_services').checked = configurations['services']['settings']['remember'];

}




const checkServices = () => {

    let configurations = getSession('configurations');
    if (configurations ? configurations['services'] ? configurations['services']['conversation'] ? false : true : true : true) configurations = getStorage('configurations');
    if (configurations == null) {
        configurations = {
            services: {
                conversation: {
                    type: 'Built-in-Conversation'
                },
                settings: {
                    remember: false
                }
            }
        }
        // chat.displayMessage('Built in Conversation is being used, configure your own.', 'watson');
    }

    setSession('configurations', configurations);

    preLoadServicesData();

    // chat.userMessage('');
}


const saveServicesConfigurations = () => {

  

    const red_radio = document.getElementById('node_red');
    const conv_radio = document.getElementById('custom_conversation');

    const remember = document.getElementById('remember_services').checked;

    let configurations = getSession('configurations');

    if (red_radio.checked) {

        const url_input = document.getElementById('node_red_uri');

        if (url_input != null && isValidURL(url_input.value)) {
            configurations['services']['conversation']['type'] = 'Node-Red';
            configurations['services']['conversation']['url'] = url_input.value.trim();
            if (remember) {
                configurations['services']['settings']['remember'] = true;
                deleteStorage('configurations');
                setStorage('configurations', configurations);
            } else {
                deleteStorage('configurations');
            }
            deleteSession('configurations');
            setSession('configurations', configurations);
            restageApp();
        } else {
            showModalAlert('Incorrect Node-Red URL, check it please.', 'error');
        }


    } else if (conv_radio.checked) {
        const username_input = document.getElementById('conv_username');
        if (username_input && username_input.value != '') {
            const password_input = document.getElementById('conv_password');
            if (password_input != null && password_input.value != '') {
                const workspace_input = document.getElementById('conv_workspace');
                if (workspace_input != null && workspace_input.value != '') {
                    let config = {};

                    config['type'] = 'Custom-Conversation';
                    config['username'] = username_input.value.trim();
                    config['password'] = password_input.value.trim();
                    config['workspace_id'] = workspace_input.value.trim();

                    configurations['services']['conversation'] = config;

                    if (remember) {
                        configurations['services']['settings']['remember'] = true;
                        deleteStorage('configurations');
                        setStorage('configurations', configurations);
                    } else {
                        deleteStorage('configurations');
                    }
                    deleteSession('configurations');
                    setSession('configurations', configurations);


                    restageApp();


                } else {
                    showModalAlert('Incorrect Conversation workspace-id, check it please.', 'error')
                }
            } else {
                showModalAlert('Incorrect Conversation password, check it please.', 'error')
            }
        } else {
            showModalAlert('Incorrect Conversation username, check it please.', 'error')
        }
    } else {
        configurations['services']['conversation']['type'] = "Built-in-Conversation";
        if (remember) {
            configurations['services']['settings']['remember'] = true;
            deleteStorage('configurations');
            setStorage('configurations', configurations);
        } else {
            deleteStorage('configurations');
        }
        deleteSession('configurations');
        setSession('configurations', configurations);
        restageApp();
    }
}

const isValidURL = (url) =>  {
    return ((url.startsWith('https://') || url.startsWith('http://')) && url.indexOf('mybluemix') != -1);
}


const showModalAlert = (msg, type) => {
    let div = document.getElementById('alertDiv');
    const color = (type == "error") ? "red" : "teal";
    div.setAttribute('class', 'row');
    div.innerHTML = '<div class="col s12"><div class="card-panel ' + color + '"><i class="material-icons close-icon right white-text"  id="removeAlert"  >close</i>' +
        '<span class="white-text">' + msg + '</span></div></div>';
}


const removeModalAlert = () => {
    let div = document.getElementById('alertDiv');
    div.removeAttribute('class');
    div.innerHTML = '';
}


const restageApp = () => {
    document.getElementById('chat_body').innerHTML = ''; // Clear Chat bubbles!

    const configurations = getSession('configurations');
    const type = configurations['services']['conversation']['type'];

}


const resetConfigurations = () => {
    deleteSession('configurations');
    deleteStorage('configurations');
    window.location.href = '/';
}

