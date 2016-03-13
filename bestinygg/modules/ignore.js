;(function(bgg) {
    bgg.ignore = (function() {
    	var style, cssBody, template
    	cssBody = '{display:none;}'
    	template = '.user-msg[data-username="{}"]'
        return {
        	init: function() {
        		style = document.createElement('style')
        		style.type = 'text/css'
        		document.head.appendChild(style)
        		bgg.settings.addObserver(function(key, val) {
        			if (key == 'bgg_user_ignore')
        				bgg.ignore.update(val)
        		})
        		bgg.ignore.update(bgg.settings.get('bgg_user_ignore'))
        	},
        	update: function(userList) {
        		var res = ''
        		userList = userList.toLowerCase().split(' ').join('').split(',')
        		for (var i = 0; i < userList.length;i++)
        			res += template.replace('{}', userList[i]) + ','
        		res = res.substring(0, res.length - 1)
        		if (style.styleSheet)
        			style.styleSheet.cssText = res + cssBody
        		else {
        			style.innerHTML = ''
        			style.appendChild(document.createTextNode(res + cssBody))
        		}
        	}
        }
    })()
}(window.BestinyGG = window.BestinyGG || {}))