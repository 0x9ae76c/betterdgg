;(function(bgg) {
    bgg.security = (function() {
        function secureWrap(proto, target) {
            var fnTarget = proto[target];
            proto[target] = function() {
                var elem = $(fnTarget.apply(this, arguments));

                // Let these formatters see the elements to avoid re-parsing html
                bgg.emoticons.wrapMessage(elem, this);
                bgg.formatters.wrapMessage(elem, this);

                elem.find('applet, body, base, embed, frame, frameset,'
                    + 'head, html, iframe, link, meta, object, script, style, title,'
                    + '[onblur], [onchange], [onclick], [ondblclick], [onfocus],'
                    + '[onkeydown], [onkeyup], [onload], [onmousedown],'
                    + '[onmousemove], [onmouseout], [onmouseover],'
                    + '[onmouseup], [onreset], [onscroll], [onselect],'
                    + '[onsubmit], [onunload]').remove();

                return elem.get(0).outerHTML;
            }
        }
        return {
            init: function() {
                secureWrap(ChatUserMessage.prototype, 'wrapMessage');
                secureWrap(ChatEmoteMessage.prototype, 'wrapMessage');
                secureWrap(ChatBroadcastMessage.prototype, 'wrapMessage');
            }
        };
    })();
}(window.BestinyGG = window.BestinyGG || {}));
