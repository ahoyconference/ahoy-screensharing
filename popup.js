    var bgPort;
    var btnShare;
    var btnShareDesktop;

    function onShareButton() {
	chrome.tabs.getSelected(null, function(tab) {
		console.log("tab "+tab.id);
		bgPort.postMessage({share: { tab: { id: tab.id, audio: true, video: true} } });
		window.close();
	    }
	);
    }

    function onShareMutedButton() {
	chrome.tabs.getSelected(null, function(tab) {
		console.log("tab "+tab.id);
		bgPort.postMessage({share: { tab: { id: tab.id, audio: false, video: true} }} );
		window.close();
	    }
	);
    }

    function onUnshareButton() {
	chrome.tabs.getSelected(null, function(tab) {
		console.log("tab "+tab.id);
		bgPort.postMessage({unshare: { tab: { id: tab.id} } });
		window.close();
	    }
	);
    }


    function onShareDesktopButton() {
	console.log("onShareDesktopButton:");
	bgPort.postMessage({share: { desktop: {} } });
    }

    document.addEventListener('DOMContentLoaded', function () {  
	btnShare = document.getElementById("btnShare");
	btnShareDesktop = document.getElementById("btnShareDesktop");
	btnShareMuted = document.getElementById("btnShareMuted");
	
	bgPort = chrome.extension.connect({name: "background"});
	
	bgPort.onMessage.addListener(function(msg) {
	    console.log("onMessage: "+JSON.stringify(msg));
	    if (msg.status != null) {
		if (msg.status.sharing) {
		    btnShare.innerHTML = "Stop sharing this tab";
		    btnShare.addEventListener('click', function() {
			onUnshareButton();
		    });
		    $('#btnShareMuted').hide();
		    $('#btnShareDesktop').hide();
		} else {
		    btnShare.innerHTML = "Share this tab (audio/video)";
		    btnShare.addEventListener('click', function() {
			onShareButton();
		    });
		    btnShareMuted.innerHTML = "Share this tab (video)";
		    btnShareMuted.addEventListener('click', function() {
			onShareMutedButton();
		    });
		    $('#btnShareMuted').show();

		    btnShareDesktop.addEventListener('click', function() {
			onShareDesktopButton();
		    });
		}
	    }
	});
	
	chrome.tabs.getSelected(null, function(tab) {
	    bgPort.postMessage({status:{id: tab.id}});
	    }
	);
    });
    
