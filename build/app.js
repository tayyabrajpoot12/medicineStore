 



$(document).on('click', '#signup', function () {
    $.mobile.changePage("signup.html", { transition: "turn", changeHash: true });
});


jQuery('div').live('pagehide', function (event, ui) {
    var page = jQuery(event.target);

    if (page.attr('data-dom-cache') == 'false') {
        page.remove();
    };
});

