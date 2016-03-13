;(function(bgg) {
    bgg.alert = (function() {
        $('body').on('click', '#bgg-alert .close', function() {
            bgg.alert.hide();
        });

        return {
            show: function(message) {
                bgg.alert.hide();
                $('#destinychat').append(bgg.templates.alert({message: message}));
                $('#bgg-alert').show();
            },
            hide: function() {
                $('#bgg-alert').hide().remove();
            }
        };
    })();
}(window.BestinyGG = window.BestinyGG || {}));
