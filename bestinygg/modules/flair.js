;(function(bgg) {

    var BOTS = [ 'Logs', 'OPbot', 'Bot', 'HighlightBot' ];
    var CONTRIBUTORS = [ '9inevolt', 'mellipelli' ];
    var MOOBIES = [ 'Humankillerx', 'loldamar', 'Nate', 'Overpowered', 'Mannekino',
                    'Zanshin314', 'Tassadar', 'Bombjin', 'DaeNda', 'StoopidMonkey',
                    'Funnyguy17', 'Derugo', 'Fancysloth', 'dawigas', 'DerFaba'
                  ];

    var _tid = null;
    var _hideAll = false;
    var _hideEvery = false;
    var _listener = null;

    bgg.flair = (function() {
        destiny.UserFeatures['BGG_CONTRIBUTOR'] = 'bgg_contributor';
        destiny.UserFeatures['BGG_MOOBIE'] = 'bgg_moobie';
        destiny.UserFeatures['BOT'] = '';

        var fnGetFeatureHTML = ChatUserMessage.prototype.getFeatureHTML;
        var bggGetFeatureHTML = function() {
            var icons = fnGetFeatureHTML.apply(this, arguments);

            //This comes first because Bot wasn't getting his flair sometimes
            if (BOTS.indexOf(this.user.username) > -1) {
                    icons += '<i class="icon-bot" title="Bot"/>';
            }

            if (_hideEvery) {
                icons = ''; //Clear the emote string to set to nothing
                return icons;
            }

            if (_hideAll) {
                return icons;
            }

            if (CONTRIBUTORS.indexOf(this.user.username) > -1) {
                icons += '<i class="icon-bgg-contributor" title="Bestiny.gg Contributor"/>';
            }

            if (MOOBIES.indexOf(this.user.username) > -1) {
                icons += '<i class="icon-bgg-moobie" title="Movie Streamer"/>';
            }
            
            return icons;
        };

        ChatUserMessage.prototype.getFeatureHTML = bggGetFeatureHTML;
        return {
            init: function() {
                bgg.flair.hideAll(bgg.settings.get('bgg_flair_hide_all'));

                bgg.settings.addObserver(function(key, value) {
                    if (key == 'bgg_flair_hide_all') {
                        bgg.flair.hideAll(value);
                    } else if (key == 'bgg_flair_hide_every') {
                        bgg.flair.hideEvery(value);
                    }
                });
            },
            hideAll: function(value) {
                _hideAll = value;
            },
            hideEvery: function(value) {
                _hideEvery = value;
            }
        };
    })();
}(window.BestinyGG = window.BestinyGG || {}));
