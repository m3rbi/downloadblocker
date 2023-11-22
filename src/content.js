chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.action == "bgcolor") {
        document.body.style.background = msg.color
    }
})