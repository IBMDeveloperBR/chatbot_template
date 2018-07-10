$(document).ready(function () {

    // Materialize initialization
    
    $('.modal').modal();
    $('ul.tabs').tabs();

    // Setup modal initialization
    var name = "setup"
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);

    var setup = (results) ? decodeURIComponent(results[0].replace(/\+/g, " ")) : null;

    if (setup) {
    
        $('#configurationModal').modal('open');
    
    }

    // Initial setup
    checkServices();
    checkLayout();

    $("#chat_input").keypress((event) => {
        sendMessage(event);
    })
    // Conversation Radio button change listener.
    $('.conv_radio').click(() => {
        radioToggle();
    })


    // Apply Services Changes.
    $('#apply-btn').click(() => {
        saveServicesConfigurations();
        saveLayoutConfigurations();
    });

    // Remove alert
    $("#removeAlert").click(() => {
        removeModalAlert();
    })


    // Reset configrations
    $("#reset_services_btn").click(() => {
        resetConfigurations();
    });

    $(".chat_popup_size_radio").click(() => {
        changePopupSize();
    });

    // Chat popup window configuration

    fixChatBodySize('body');
    changePopupSize('classic');
    $(window).resize(function () {
        fixChatBodySize('body');
        changePopupSize('classic');
    });


});




