;(function(bgg) {
    var SETTINGS = {
        'bgg_emote_tab_priority': {
            'name': 'Prioritize emotes',
            'description': 'Prioritize emotes for tab completion',
            'value': true,
            'type': 'boolean'
        },

        'bgg_emote_override': {
            'name': 'Override emotes',
            'description': 'Override some emotes',
            'value': true,
            'type': 'boolean'
        },

        'bgg_disable_combos': {
            'name': 'Disable All Combos',
            'description': 'Shut off combos',
            'value': false,
            'type': 'boolean'
        },

        'bgg_animate_disable': {
            'name': 'Disable GIF Emotes',
            'description': 'Remove RaveDoge and the likes',
            'value': false,
            'type': 'boolean'
        },

        'bgg_text_disable': {
            'name': 'Disable Text Combos',
            'description': 'Remove OuO combos and the likes',
            'value': false,
            'type': 'boolean'
        },

        'bgg_light_theme': {
            'name': 'Light theme',
            'description': 'Light chat theme',
            'value': false,
            'type': 'boolean'
        },

        'bgg_convert_overrustle_links': {
            'name': 'Convert stream links to overrustle',
            'description': 'Auto-converts stream links to use overrustle.com',
            'value': false,
            'type': 'boolean'
        },

        'bgg_flair_hide_all': {
            'name': 'Hide all BetterD.GG flair',
            'description': 'Hide all Better Destiny.gg flairs',
            'value': false,
            'type': 'boolean'
        },

        'bgg_flair_hide_every': {
            'name': 'Hide all D.GG flair',
            'description': 'Hide all Destiny.gg flairs',
            'value': false,
            'type': 'boolean'
        },

        'bgg_filter_words': {
            'name': 'Custom ignore words',
            'description': 'Comma-separated list of words to filter messages from chat (case-insensitive)',
            'value': '',
            'type': 'string'
        },

        'bgg_passive_stalk': {
            'name': 'Passive Stalk Targets OuO',
            'description': 'Comma-separated list of chatters',
            'value':'',
            'type':'string'
        },

        'bgg_user_ignore': {
            'name': 'Users to ignore',
            'description': 'List of users to ignore without removing their mentions',
            'value':'',
            'type':'string'
        }
    };

    bgg.settings = (function() {
        var _observers = [];

        var _notify = function(key, value) {
            for (var i = 0; i < _observers.length; i++) {
                _observers[i].call(this, key, value);
            }
        };

        return {
            init: function() {
                $('#destinychat .chat-tools-wrap').prepend(bgg.templates.menu_button());
                $('#chat-bottom-frame').append(
                    $(bgg.templates.menu()).append(
                        bgg.templates.menu_footer({version: bgg.version})));

                $('#bgg-settings-btn').on('click', function(e) {
                    $('#bgg-settings').toggle();
                    $(this).toggleClass('active');
                    window.cMenu.closeMenus(destiny.chat.gui);
                });

                $('#bgg-settings .close').on('click', function(e) {
                    bgg.settings.hide();
                });

                for (var key in SETTINGS) {
                    var s = SETTINGS[key];
                    s.key = key;
                    s.value = bgg.settings.get(s.key, s.value);
                    bgg.settings.add(s);
                }

                destiny.chat.gui.chatsettings.btn.on('click', bgg.settings.hide);
                destiny.chat.gui.userslist.btn.on('click', bgg.settings.hide);
            },
            addObserver: function(obs) {
                if (_observers.indexOf(obs) < 0) {
                    _observers.push(obs);
                }
            },
            removeObserver: function(obs) {
                var i = _observers.indexOf(obs);
                if (i > -1) {
                    _observers.splice(i, 1);
                    return true;
                }
                return false;
            },
            hide: function() {
                $('#bgg-settings').hide();
                $('#bgg-settings-btn').removeClass('active');
            },
            add: function(setting) {
                if (setting.type == 'string') {
                    $('#bgg-settings ul').append(bgg.templates.menu_text({setting: setting}));
                    $('#bgg-settings input[type="text"]#' + setting.key).on('blur', function(e) {
                        var value = $(this).val();
                        bgg.settings.put(setting.key, value);
                    });
                } else { // boolean
                    $('#bgg-settings ul').append(bgg.templates.menu_checkbox({setting: setting}));
                    $('#bgg-settings input[type="checkbox"]#' + setting.key).on('change', function(e) {
                        var value = $(this).prop('checked');
                        bgg.settings.put(setting.key, value);
                    });
                }
            },
            get: function(key, defValue) {
                var value = localStorage.getItem(key);
                if (value === null) {
                    value = defValue;
                    bgg.settings.put(key, defValue);
                } else if (SETTINGS[key] && SETTINGS[key].type == 'boolean') {
                    value = value === 'true';
                }

                return value;
            },
            put: function(key, value) {
                localStorage.setItem(key, value);
                _notify(key, value);
            }
        };
    })();
}(window.BestinyGG = window.BestinyGG || {}));
