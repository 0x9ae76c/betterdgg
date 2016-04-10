;(function(bdgg) {
	bdgg.joinnotify = (function() {
		var fnOnJOIN, fnHandleCommand, targets, userAlreadyPresent, userEntered

		fnOnJOIN = destiny.chat.onJOIN
		fnHandleCommand = destiny.chat.handleCommand

		targets = []
		userAlreadyPresent = " is already in chat you big dummy!"
		userEntered = " entered chat!"

		function pushChat(string) {
			destiny.chat.gui.push(new ChatInfoMessage(string))
		}

		function pushError(string) {
			destiny.chat.gui.push(new ChatErrorMessage(string))
		}

		function targetCheck(target) {
			let idx = targets.indexOf(target.toLowerCase())
			if (idx === -1)
				return
			targets.splice(idx, 1)
			pushChat(target + userEntered)
		}

		return {
			init: function() {
				destiny.chat.onJOIN = function(data) {
					if (targets.length !== 0)
						targetCheck(data.nick)
					fnOnJOIN.apply(this, arguments)
				}
				destiny.chat.handleCommand = function(string) {
					var match
					string = string.trim()
					if (match = string.match(/^(jn|joinnotify)\s(\w+)/)) {
						let list = Object.keys(destiny.chat.users).map(property => property.toLowerCase())
						if (list.indexOf(match[2].toLowerCase()) !== -1) {
							pushError(match[2] + userAlreadyPresent)
						} else {
							pushChat("I will notify you when " + match[2] + " comes online. d-(OuO )z")
							targets.push(match[2])
						}
					} else if (match = string.match(/^(jn|joinnotify)\s*$/)) {
						if (targets.length === 0) {
							pushError("Your targets list is empty. OnO")
						} else {
							pushChat("Currently waiting on the following users: " + targets.join(", "))
						}
					} else {
						fnHandleCommand.apply(this, arguments)
					}
				}
			}
		}
	})()
}(window.BetterDGG = window.BetterDGG || {}))