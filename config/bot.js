const watson = require('watson-developer-cloud');
const cfenv = require('cfenv');
const fs = require('fs');




let vcapLocal = null,
    appEnv = null,
    appEnvOpts = {},
    conversationWorkspace, conversation;




const initializeAppEnv = (callback) => {
    console.log('apEnvOpts:    '+JSON.stringify(appEnvOpts));
    appEnv = cfenv.getAppEnv(appEnvOpts);
    appEnv.services = appEnvOpts.vcap.services;
   
    // if (appEnv.isLocal) {
    console.log('Local Conversation initialization...');
    if (appEnv.services.conversation) {
        console.log('Initializing conversation service!');
        initConversation(callback);
    } else {
        console.log('No Watson conversation service exists');
        callback({
            error: true,
            description: "No Watson conversation service exists"
        });
    }
    // } else {
    // console.log('On server Conversation initialization...');
    // initConversation(callback);
    // }
}




const initConversation = (callback) => {

    let conversationCredentials = appEnv.getServiceCreds('Conversation');
    const conversationUsername =  conversationCredentials.username;
    const conversationPassword =  conversationCredentials.password;
    const conversationURL =  conversationCredentials.url;
    const workspaceID =  conversationCredentials.workspace_id;

    conversation = watson.conversation({
        url: conversationURL,
        username: conversationUsername,
        password: conversationPassword,
        version_date: '2017-05-26',
        version: 'v1'
    });

    // Check if the workspace ID is specified in the environment
    conversationWorkspace = process.env.CONVERSATION_WORKSPACE;

    if (!conversationWorkspace) {

        console.log('No conversation workspace configured in the environment.');;
        console.log(`Looking for a workspace id : ${workspaceID}`);

        conversation.listWorkspaces((err, result) => {
            if (err) {
                console.log('Failed to query workspaces. Conversation will not work. ', err);
                callback({
                    error: true,
                    description: "Failed to query workspaces. Conversation woll not work."
                });
            } else {
                const workspace = result.workspaces.find(workspace => workspace.workspace_id === workspaceID);
                if (workspace) {
                    conversationWorkspace = workspace.workspace_id;
                    console.log(`Using Watson Conversation with username ${conversationUsername}  and workspace ${conversationWorkspace}`);
                    callback({
                        error: false
                    });

                } else {
                    console.log('Importing workspace from ./conversation/conversation.json');
                    // Create the workspace
                    const watsonWorkspace = JSON.parse(fs.readFileSync('./conversation/conversation.json'));
                    // Force the name
                    watsonWorkspace.name = 'Conversation';
                    conversation.createWorkspace(watsonWorkspace, (createErr, workspace) => {
                        if (createErr) {
                            console.log(`Failed to create workspace ${err}`)
                            callback({
                                error: true,
                                description: "Failed to create workspace"
                            });
                        } else {
                            conversationWorkspace = workspace.workspace_id;
                            console.log('Successfully created the workspace Conversation Demo');
                            console.log(`Using Watson Conversation with username ${conversationUsername} and workspace ${conversationWorkspace}`);
                            callback({
                                error: false
                            });
                        }
                    });
                }
            }
        })
    } else {
        console.log('Workspace ID was specified as an environment variable.');
        console.log(`Using Watson Conversation with username ${conversationUsername} and workspace ${conversationWorkspace}`);
        callback({
            error: false
        });
    }
}



module.exports = {
    isInitialized: () => {
        return conversationWorkspace != null;
    },
    init: (callback) => {

        fs.stat('./vcap-local.json', (err, stat) => {
            if (err && err.code !== 'ENOENT') {
                console.log(`Error retrieving local vcap: ${err.code}`);
                callback({
                    error: true,
                    description: 'Error retrieving local vcap.'
                })
            } else {
                if (err && err.code === 'ENOENT') {
                    console.log('No vcap-local.json file');
                } else {
                    vcapLocal = require('../vcap-local.json');
                    console.log('Loaded Local VCAP!');
                    console.log("VCAP LOCAL ******** : ");
                    console.log(JSON.stringify(vcapLocal));
                    appEnvOpts = {
                        vcap: vcapLocal
                    }
                }
                initializeAppEnv(callback);
            }
        })
    },

    sendMessage: (req, callback) => {
        let params = req.body.params;
        params.workspace_id = conversationWorkspace;
        conversation.message(params, function (err, data) {
            if (err) {
                console.log(`Error in sending message:  ${err}`);
                return callback(err);
            } else {
                const conv = data.context.conversation_id;
                return callback(null, data);
            }
        })
    }
}




