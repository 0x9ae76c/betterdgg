;(function(bgg) {
    var _users = {};

    function _initUsers() {
        var listener = function(e) {
            if (window != e.source) {
                return;
            }

            if (e.data.type == 'bgg_users_refreshed') {
                _users = e.data.users;
            }
        };
        window.addEventListener('message', listener);
    }

    bgg.users = (function() {
        return {
            init: function() {
                _initUsers();
                setTimeout(bgg.users.refresh, 1000);
            },
            get: function(username) {
                return _users[username];
            },
            refresh: function() {
                window.postMessage({type: 'bgg_users_refresh'}, '*');
            }
        };
    })();
}(window.BestinyGG = window.BestinyGG || {}));
