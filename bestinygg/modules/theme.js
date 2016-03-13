;(function(bgg) {
    bgg.theme = (function() {
        return {
            init: function() {
                bgg.theme.setLightTheme(bgg.settings.get('bgg_light_theme'));
                bgg.settings.addObserver(function(key, value) {
                    if (key == 'bgg_light_theme') {
                        bgg.theme.setLightTheme(value);
                    }
                });
            },
            setLightTheme: function(value) {
                if (value) {
                    $('.chat').removeClass('chat-theme-dark').addClass('chat-theme-light');
                } else {
                    $('.chat').removeClass('chat-theme-light').addClass('chat-theme-dark');
                }
            }
        }
    })();
}(window.BestinyGG = window.BestinyGG || {}));
