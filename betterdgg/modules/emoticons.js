;(function(bgg) {
    bgg.emoticons = (function() {
        var override, emoteTabPriority, everyEmote;
        var baseEmotes = destiny.chat.gui.emoticons;

        var EMOTICONS = [ "CallChad", "FIDGETLOL",
            "CallCatz", "DESBRO", "Dravewin", "TooSpicy",
            "BrainSlug", "DansGame", "Kreygasm", "PJSalt", "PogChamp",
            "ResidentSleeper", "WinWaker", "ChanChamp",
            "OpieOP", "4Head", "DatSheffy", "GabeN", "SuccesS",
            "TopCake", "DSPstiny", "SephURR", "Keepo", "POTATO", "ShibeZ",
            "lirikThump", "Riperino", "NiceMeMe", "YEE", "BabyRage",
            "dayJoy", "kaceyFace", "AlisherZ", "D:",
            "WEOW", "Depresstiny", "HerbPerve", "CARBUCKS", "Jewstiny", "PEPE",
            "ITSRAWWW", "EleGiggle", "SwiftRage", "SMOrc", "SSSsss", "CallHafu",
            "ChibiDesti", "CORAL", "CUX", "KappaPride", "DJAslan",
            "MingLee", "OhMyDog", "CoolCat", "FeelsBadMan", "FeelsGoodMan",
            "NOBULLY", "haHAA", "gachiGASM"
        ];

        var ANIMATED = [ "CuckCrab", "SourPls", "RaveDoge" ];

        var OVERRIDES = [ "SoSad", "SpookerZ", "Kappa", "OhKrappa", "DappaKappa", "Klappa" ];

        var TEXT = [ "OuO", "XD", "xD" ];

        var SUBONLY = [ "nathanDad", "nathanFeels", "nathanFather", "nathanDank",
        "nathanDubs1", "nathanDubs2", "nathanDubs3", "nathanParty" ];

        var bggSortResults = function(fnSortResults) {
            return function(a, b) {
                if (emoteTabPriority) {
                    if (a.isemote != b.isemote) {
                        return a.isemote ? -1 : 1;
                    }
                }

                return fnSortResults.apply(this, arguments);
            };
        };

        var emoticons, bggemoteregex;
        function replacer(match, emote) {
            var emoteCSSTitle = '<div title="' + emote + '" class="chat-emote';
            emote = emote.replace(/[^\w-]/, '_');

            //Disable Animated Emotes
            if (ANIMATED.indexOf(emote) > -1 && bgg.settings.get('bgg_animate_disable')) {
                return emote;
            }

            //Injecct class
            if (SUBONLY.indexOf(emote) > -1) {
                emoteCSSTitle = emoteCSSTitle + ' chat-emote-' + emote;
            } 

            else if (TEXT.indexOf(emote) > -1){
                emoteCSSTitle = emote + emoteCSSTitle + ' bgg-chat-emote-' + emote;
            }

            else {
                emoteCSSTitle = emoteCSSTitle + ' bgg-chat-emote-' + emote;
            }

            return emoteCSSTitle + '"></div>';

        }

        return {
            all: [],
            init: function() {
                emoticons = EMOTICONS.concat(SUBONLY).concat(TEXT).concat(ANIMATED)
                    .filter(function(e) { return destiny.chat.gui.emoticons.indexOf(e) == -1 })
                    .sort();
                destiny.chat.gui.emoticons = destiny.chat.gui.emoticons.concat(emoticons).sort();
                $.each(emoticons, function(i, v) { destiny.chat.gui.autoCompletePlugin.addEmote(v) });
                bgg.emoticons.all = emoticons;
                everyEmote = destiny.chat.gui.emoticons;

                bgg.emoticons.textEmoteDisable(bgg.settings.get('bgg_text_disable'));

                bggemoteregex = new RegExp('\\b('+emoticons.join('|')+')(?:\\b|\\s|$)', 'gm');

                // multi-emote
                $.each(destiny.chat.gui.formatters, function(i, f) {
                    if (f && f.hasOwnProperty('emoteregex') && f.hasOwnProperty('gemoteregex')) {
                        f.emoteregex = f.gemoteregex;
                        return false;
                    }
                });

                bgg.emoticons.giveTabPriority(bdgg.settings.get('bgg_emote_tab_priority'));
                bgg.emoticons.overrideEmotes(bdgg.settings.get('bgg_emote_override'));
                bgg.settings.addObserver(function(key, value) {
                    if (key == 'bgg_emote_tab_priority') {
                        bgg.emoticons.giveTabPriority(value);
                    } else if (key == 'bgg_emote_override') {
                        bgg.emoticons.overrideEmotes(value);
                    } else if (key == 'bgg_text_disable') {
                        bgg.emoticons.textEmoteDisable(value);}
                });

                // hook into emotes command
                var fnHandleCommand = destiny.chat.handleCommand;
                destiny.chat.handleCommand = function(str) {
                    fnHandleCommand.apply(this, arguments);
                    if (/^emotes ?/.test(str)) {
                        this.gui.push(new ChatInfoMessage("Bestiny.gg: "+ emoticons.join(", ")));

                        if (SUBONLY.length > 0) {
                            this.gui.push(new ChatInfoMessage("Unlocked: "+ SUBONLY.sort().join(", ")));
                        }

                        

                        if (override && OVERRIDES.length > 0) {
                            this.gui.push(new ChatInfoMessage("Overrides: "+ OVERRIDES.sort().join(", ")));
                        }

                        
                    }
                };

                var fnSortResults = destiny.chat.gui.autoCompletePlugin.sortResults;
                destiny.chat.gui.autoCompletePlugin.sortResults = bggSortResults(fnSortResults);
            },
            giveTabPriority: function(value) {
                emoteTabPriority = value;
            },
            overrideEmotes: function(value) {
                override = value;
            },
            textEmoteDisable: function(value) {
                
                var editEmoteList;

                if (value){

                    editEmoteList = EMOTICONS.concat(SUBONLY).concat(ANIMATED)
                    .filter(function(e) { return baseEmotes.indexOf(e) == -1 })
                    .sort();

                    destiny.chat.gui.emoticons = baseEmotes.concat(editEmoteList).sort();
                    bgg.emoticons.all = editEmoteList;

                }

                else {

                    editEmoteList = EMOTICONS.concat(SUBONLY).concat(ANIMATED).concat(TEXT)
                    .filter(function(e) { return baseEmotes.indexOf(e) == -1 })
                    .sort();

                    destiny.chat.gui.emoticons = everyEmote;
                    bgg.emoticons.all = editEmoteList;

                }


            },
            wrapMessage: function(wrapped, message) {
                wrapped.find('span').addBack().contents().filter(function() { return this.nodeType == 3})
                    .replaceWith(function() {
                        return this.data
                            .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
                            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                            .replace(bggemoteregex, replacer);
                    });

                if (override) {
                    wrapped.find('.chat-emote').addClass('bgg-chat-emote-override');
                }
            }
        }
    })();
}(window.BestinyGG = window.BestinyGG || {}));
