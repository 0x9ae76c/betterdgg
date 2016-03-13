;(function(bgg) {

    var muted = false;
    var muteMessage = "Bot didn't say how long you were muted, DaFellas";
    var lastMute = 0;

    function _timeDiff( tstart, tend ) {
        var diff = Math.floor((tend - tstart) / 1000), TimeArray = [
            { value: 60, name: "seconds" },
            { value: 60, name: "minutes" }
        ];

        var muteTimeRemaining = '';
        for (var i = 0; i < TimeArray.length; ++i) {
            muteTimeRemaining = (diff % TimeArray[i].value) + " " + TimeArray[i].name + " " + s;
            diff = Math.floor(diff / TimeArray[i].value);
        }
        return muteTimeRemaining;
    }

    bgg.chat = (function() {
        return {
            init: function() {
                var fnChatMUTE = destiny.chat.onMUTE;

        var bggChatMUTE = function(data) {
            var bggMUTE = fnChatMUTE.apply(this, arguments);
            if (data.data.toLowerCase() == this.user.username.toLowerCase()){
                muted = true;
                console.log("You were muted at: "+_timeConverter(data.timestamp));
            }
            //console.log(data);
            return bggMUTE;
        };

        destiny.chat.onMUTE = bggChatMUTE;

        var fnChatMSG = destiny.chat.onMSG;

        var bggChatMSG = function(data) {
            var bggMessage = fnChatMSG.apply(this, arguments);
           // var ignoreBool = false;
            if (bgg.settings.get('bgg_disable_combos') === true){
                //I copied this from Dicedlemming it might suck but it works.
                ChatEmoteMessage=function(emote,timestamp){return this.emotecount=-999,this.emotecountui=null,this}
            }

            var ignoreList = bgg.settings.get('bgg_user_ignore');
           
            console.log(data.nick + ' Name data');
            ignoreList = ignoreList.toLowerCase().split(' ').join('').split(',')
             console.log(ignoreList);
            for (var i = 0; i < ignoreList.length; i++) {
            	if (ignoreList[i] == data.nick) {
                    console.log('shit meme tbh fam')
            		//ignoreBool = true;
                    bggMessage = ''
            	}
            }
            //console.log(ignoreBool);
            if (data.nick == "Bot" && muted === true){
                console.log("Mute Message found");
                lastMute = data.timestamp;
                muteMessage = data.data;
                muted = false;
            }
           // if (ignoreBool = true) {
              //  console.log(bggMessage);
               // console.log(data.nick);  
            //	return;
          //  } else {
           // 	return bggMessage;
          //  }
            return bggMessage;
        };

        destiny.chat.onMSG = bggChatMSG;

        var fnChatERR = destiny.chat.onERR;

        var bggChatERR = function(data) {
            var bggERR = fnChatERR.apply(this, arguments);
            if (data == "muted"){
                console.log(data);
                console.log(muteMessage);
                var muteTimestamp = muteMessage.match(/[0-9]*[0-9]m/);  //find mute timestamp
                if (muteTimestamp !== null){
                    var muteTimestampString = muteTimestamp.toString();
                    var muteLength = muteTimestampString.substr(0, muteTimestampString.length-1);
                    muteLength = parseInt(muteLength);
                    muteLength = lastMute+muteLength*60*1000; //Add seconds to timestamp
                    var newDate = new Date();
                    var currentStamp = newDate.getTime();
                    this.gui.push(new ChatInfoMessage("You are still muted for: "+_timeDiff(currentStamp, muteLength)));
                }
            }
            return bggERR;
        };

        destiny.chat.onERR = bggChatERR;
            }
        }
    })();
}(window.BestinyGG = window.BestinyGG || {}));
