var extensionPort = null;

extensionPort = chrome.runtime.connect({name: "ahoyconference"});
if (extensionPort) {

    extensionPort.onMessage.addListener(function(msg) {
	/* forward message from background.js to controller.js */
	window.postMessage({ type: "FROM_CONTENT", payload: msg.data }, "*");
    });

    extensionPort.onDisconnect.addListener(function() {
	extensionPort = null;
    });
}

function handleEvent(event) {

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
	/* forward message from controller.js to background.js */
	if (extensionPort) {
	    extensionPort.postMessage(event.data.payload);
	}
    }
}

window.addEventListener("message", handleEvent, false);
