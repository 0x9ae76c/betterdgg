;(function(bgg) {
    bgg.firstrun = (function() {
        return {
            init: function() {
                var lastRun = bgg.settings.get('bgg_lastrun_version');
                if (bgg.version != lastRun) {
                    $('body').append(bgg.templates.popup({version: bgg.version}));
                    var popup = $('#bgg-popup');
                    popup.find('.bgg-dismiss').on('click', function() {
                        bgg.settings.put('bgg_lastrun_version', bgg.version);
                        popup.remove();
                    });
                    popup.show();
                }

                var chat = $('#destinychat');
                chat.append(bgg.templates.about({version: bgg.version}));

                $('body').on('click', '.bgg-whatsnew', function() {
                    $('#bgg-about').show();
                    bgg.settings.hide();
                    bgg.alert.hide();
                });

                $('#bgg-about .close').on('click', function() {
                    $('#bgg-about').hide();
                });
            }
        };
    })();
}(window.BestinyGG = window.BestinyGG || {}));
