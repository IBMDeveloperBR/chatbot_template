


const fixChatBodySize = (element) => {

    const full_size_radio = document.getElementById('full_chat_size');

    if (element == 'body') {
        if (document.getElementById('chat_popup')) {

            $("#chat_body").css({
                "height": ((full_size_radio.checked) ? $("#chat_div").height() - 80 : $("#chat_popup").height() - 80) + 'px'
            })
        }
    } else if (element == 'classic') {


        $("#chat_body_classic").css({
            "height":((full_size_radio.checked) ?  $(".card").height() - 35 : $(".card-content").height() - 35) + 'px'
        })
    }
}
const changePopupSize = () => {

    var full_size_radio = document.getElementById('full_chat_size');
    var default_size_radio = document.getElementById('default_chat_size');

    if (full_size_radio.checked) {
        $("#chat_popup_classic").animate({
            height: '100%',
            width: $(".card").width() + 'px',
            'border-radius': 0
        });
        fixChatBodySize('classic');

    } else if (default_size_radio.checked) {

        $("#chat_popup_classic").animate({
            height: '70%',
            width: '60px',
            'border-top-left-radius': '4px'
        }, 400, 'swing', () => {
            fixChatBodySize('classic')
        });


    }

}

const preLoadLayoutData = () => {
    const configurations = getSession('configurations');

    if (configurations['layout']['theme'] == 'classic') {

        document.getElementById('classic_radio').checked = true;
        removeClass('popup_size', 'hide');
        document.getElementById(configurations['layout']['classic']['chat_popup_size'] + '_chat_size').checked = true;


    }


}

const changeLayout = () => {

    const configurations = getSession('configurations');

    if (configurations['layout']['theme'] == 'classic') {

        let chat_div = document.getElementById('chat_div');
        let classic_size = (configurations['layout']['classic']['chat_popup_size'] != 'default') ? 'full_size' : 'default_size';

        chat_div.innerHTML = '<div class="chat_popup ' + classic_size + '" id="chat_popup">' +
            '<div class="chat_header" id="chat_header">Chat with Watson</div>' +
            '<div class="chat_body" id="chat_body"></div>' +
            '<div class="chat_footer" id="chat_footer">' +
            '<input type="text" id="chat_input" class="chat_input" placeholder="Type a message.." /></div></div>';

        chat_div.setAttribute('class', 'classic')

        fixChatBodySize('body');
        fixChatBodySize('classic');
        
        $("#chat_input").keypress((event) => {
            sendMessage(event);
        })
    }


}

const checkLayout = () => {

    let configurations = getSession('configurations');

    if (configurations['layout'] == null) {
        configurations['layout'] = {
            theme: "classic",
            classic: {
                chat_popup_size: "default"
            }
        }
    }

    setSession('configurations', configurations);

    preLoadLayoutData();

    changeLayout();

    userMessage('');
}


const saveLayoutConfigurations = () => {

    const classic_theme_radio = document.getElementById('classic_radio');
    let configurations = getSession('configurations');



    if (classic_theme_radio.checked) {


        const full_size_radio = document.getElementById('full_chat_size');
        const default_size_radio = document.getElementById('default_chat_size');

        configurations['layout']['theme'] = 'classic';

        if (full_size_radio.checked) {

            configurations['layout']['classic'] = {
                chat_popup_size: 'full'
            }



        } else if (default_size_radio.checked) {
            configurations['layout']['classic'] = {
                chat_popup_size: 'default'
            }
        }

        setSession('configurations', configurations);

        changeLayout();

        resetContext();
        userMessage('');

    }

}
