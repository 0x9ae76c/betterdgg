;(function(bdgg) {

    var BOTS = [ 'Logs', 'OPbot', 'Bot', 'HighlightBot' ];
    var CONTRIBUTORS = [ '9inevolt', 'mellipelli' ];
    var MOOBIES = [ 'Humankillerx', 'loldamar', 'Nate', 'Overpowered', 'Mannekino',
                    'Zanshin314', 'Tassadar', 'Bombjin', 'DaeNda', 'StoopidMonkey',
                    'Funnyguy17', 'Derugo', 'Fancysloth', 'dawigas', 'DerFaba'
                  ];

    function _getToken() {
        try {
            var response = $.ajax(window.location.origin + '/profile/authentication', {
                async: false,
                timeout: 3000
            });

            if (response.status == 200) {
                var tokenLinks = $(response.responseText).find("a[href^='/profile/authtoken/']");
                if (tokenLinks.length > 0) {
                    var href = tokenLinks[0].getAttribute('href');
                    var matches;
                    if (matches = /^\/profile\/authtoken\/(\w+)/.exec(href)) {
                        return matches[1];
                    }
                } else {
                    bdgg.alert.show(ALERT_MSG);
                }
            }
        } finally {
        }
    }

    var _tid = null;
    var _hideAll = false;
    var _hideEvery = false;
    var _listener = null;

    bdgg.flair = (function() {
        destiny.UserFeatures['BDGG_CONTRIBUTOR'] = 'bdgg_contributor';
        destiny.UserFeatures['BDGG_MOOBIE'] = 'bdgg_moobie';
        destiny.UserFeatures['BOT'] = '';

        var fnGetFeatureHTML = ChatUserMessage.prototype.getFeatureHTML;
        var bdggGetFeatureHTML = function() {
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
                icons += '<i class="icon-bdgg-contributor" title="Better Destiny.gg Contributor"/>';
            }

            if (MOOBIES.indexOf(this.user.username) > -1) {
                icons += '<i class="icon-bdgg-moobie" title="Movie Streamer"/>';
            }
            
            return icons;
        };

        ChatUserMessage.prototype.getFeatureHTML = bdggGetFeatureHTML;
        return {
            init: function() {
                bdgg.flair.hideAll(bdgg.settings.get('bdgg_flair_hide_all'));

                bdgg.settings.addObserver(function(key, value) {
                    if (key == 'bdgg_flair_hide_all') {
                        bdgg.flair.hideAll(value);
                    } else if (key == 'bdgg_flair_hide_every') {
                        bdgg.flair.hideEvery(value);
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
}(window.BetterDGG = window.BetterDGG || {}));
