    var CryptoJS=CryptoJS||function(h,s){var f={},t=f.lib={},g=function(){},j=t.Base={extend:function(a){g.prototype=this;var c=new g;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},q=t.WordArray=j.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||u).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=j.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new q.init(c,a)}}),v=f.enc={},u=v.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,2),16)<<24-4*(b%8);return new q.init(d,c/2)}},k=v.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new q.init(d,c)}},l=v.Utf8={stringify:function(a){try{return decodeURIComponent(escape(k.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data")}},parse:function(a){return k.parse(unescape(encodeURIComponent(a)))}},x=t.BufferedBlockAlgorithm=j.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=l.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var m=0;m<a;m+=e)this._doProcessBlock(d,m);m=d.splice(0,a);c.sigBytes-=b}return new q.init(m,b)},clone:function(){var a=j.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});t.Hasher=x.extend({cfg:j.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){x.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return new a.init(d).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return new w.HMAC.init(a,d).finalize(c)}}});var w=f.algo={};return f}(Math);!function(h){for(var s=CryptoJS,f=s.lib,t=f.WordArray,g=f.Hasher,f=s.algo,j=[],q=[],v=function(a){return 4294967296*(a-(a|0))|0},u=2,k=0;64>k;){var l;a:{l=u;for(var x=h.sqrt(l),w=2;w<=x;w++)if(!(l%w)){l=!1;break a}l=!0}l&&(8>k&&(j[k]=v(h.pow(u,.5))),q[k]=v(h.pow(u,1/3)),k++);u++}var a=[],f=f.SHA256=g.extend({_doReset:function(){this._hash=new t.init(j.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],m=b[2],h=b[3],p=b[4],j=b[5],k=b[6],l=b[7],n=0;64>n;n++){if(16>n)a[n]=c[d+n]|0;else{var r=a[n-15],g=a[n-2];a[n]=((r<<25|r>>>7)^(r<<14|r>>>18)^r>>>3)+a[n-7]+((g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10)+a[n-16]}r=l+((p<<26|p>>>6)^(p<<21|p>>>11)^(p<<7|p>>>25))+(p&j^~p&k)+q[n]+a[n];g=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&m^f&m);l=k;k=j;j=p;p=h+r|0;h=m;m=f;f=e;e=r+g|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+m|0;b[3]=b[3]+h|0;b[4]=b[4]+p|0;b[5]=b[5]+j|0;b[6]=b[6]+k|0;b[7]=b[7]+l|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=g.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=g._createHelper(f);s.HmacSHA256=g._createHmacHelper(f)}(Math);

    function createUniqueId() {
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
	var hash = CryptoJS.SHA256(uuid+"-"+navigator.userAgent+new Date().getTime());
	return hash.toString();
    }

    function generateTransactionID() {
	return createUniqueId();
    }

    function TabCaptureContext(id, tab) {
	this.tab = tab;
	this.id = id;
	this.gw_connection = null;
	this.peer_connection = null;
	this.local_stream = null;
	this.width = null;
	this.height = null;
	this.url = null;
	this.audio = false;
	this.video = false;
    }
    
    var contentScriptPorts = new Array();
    var captures = new Object();
    var cameraWs = null;

    function processSdp(sdp_str) {
	return sdp_str;
        var sdp = new Array();
        var sdp_idx = 0;
        var fingerprint = "";
        var has_mid = false;
        var lines = sdp_str.split("\r\n");

        for (var i = 0; i < lines.length; i++) {
	    if (lines[i].indexOf("=AS:") > 0) {
		sdp[sdp_idx++] = "b=AS:1000";
            } else {
                /* keep the rest */
                sdp[sdp_idx++] = lines[i];
            }
        }
        return sdp.join("\r\n");
    }


    function sendMessage(message, connection) {
	message = JSON.stringify(message);
        if (connection != null) {
    	    connection.send(message);
        }
    };

    function sendMediaReceiveResponse(context, sdp, transactionID) {
	console.log("sendMediaReceiveResponse");
        sendMessage({"messageType":"MEDIA_RECEIVE_response", "status": 200, "reason": "OK", "sdp": sdp, "transactionID": transactionID}, context.gw_connection);
    }

    function sendMediaShareRequest(context) {
	console.log("sendMediaShareRequest");
        sendMessage({"messageType":"MEDIA_SHARE_request", "audio": context.audio, "video": context.video, "transactionID": generateTransactionID()}, context.gw_connection);
    }
    
    function createPeerConnection() {
        var peer_connection = null;
        try {
	    var pc_constraints = {"optional": [{"DtlsSrtpKeyAgreement": true}]};
	    peer_connection = new webkitRTCPeerConnection(null, pc_constraints);
	    if (peer_connection == null) {
	        console.log("createPeerConnection: FAILED.");
	    } else {
    		console.log("createPeerConnection: created RTCPeerConnection.");
    	    }
	} catch (e) {
    	    console.log("createPeerConnection: unable to create peerconnection.");
	}
	return peer_connection;
    }

    function createSdpAnswer(context, transactionID, remote_sdp_str) {
	var jsep_msg = { "type": "offer", "sdp": processSdp(remote_sdp_str)};
	remoteDescription = new RTCSessionDescription(jsep_msg);
	remoteDescription_sdp = remoteDescription.sdp;
	
	context.peer_connection.setRemoteDescription(remoteDescription, 
	    function() {
	        console.log("setRemoteDescription: OK");
	        context.peer_connection.createAnswer(
			function(sessionDescription) { 
			    sessionDescription.sdp = processSdp(sessionDescription.sdp);
			    context.peer_connection.setLocalDescription(sessionDescription, 
				function() {
				    sendMediaReceiveResponse(context, sessionDescription.sdp, transactionID);
				    if (context.url) {
					sendMessage({messageType: "CHAT_MESSAGE_request", message:{text: JSON.stringify({chat:context.url})}, transactionID: generateTransactionID()}, context.gw_connection);
				    }
				},
				function() {
				    console.log("setLocalSessionDescription: ERROR");
				}
			    )
			},
			function() {
			    console.log("createSdpAnswerErrorCallback:");
			},
			{'mandatory': {'OfferToReceiveAudio':false, 'OfferToReceiveVideo':false}}
		    );
	    },
	    function() {
	        console.log("setRemoteDescription: ERROR");
	    }
	);
    }

    function handleMediaReceiveRequest(context, json_msg) {
	var call_peer_sdp = json_msg.sdp;
	try {
	    context.peer_connection = createPeerConnection();
	    context.peer_connection.addStream(context.local_stream);
	    createSdpAnswer(context, json_msg.transactionID, unescape(call_peer_sdp));
	} catch (error) {
	    console.log("handleMediaReceiveRequest: "+error);
	}
    }


    function handleConferenceJoinResponse(context, json_msg) {
	if (json_msg.status == 200) {
	    if (context.tab) {
		/* share the tab */
		chrome.tabs.get(context.id, function(tab) {
		    if (tab != null) {
			console.log("tab.width "+tab.width+" tab.height "+tab.height);
			context.width = tab.width;
			context.height = tab.height;
			context.url = tab.url;
			var captureOptions = { audio : context.audio, video : context.video, videoConstraints:{mandatory:{minWidth:tab.width, maxWidth:tab.width, minHeight:tab.height, maxHeight:tab.height}}};

			chrome.tabCapture.capture(captureOptions, 
			    function(stream) {
				if (stream != null) {
				    if (context.audio) {
					context.audio = stream.getAudioTracks().length == 1;
				    }
				    if (context.video) {
					context.video = stream.getVideoTracks().length == 1;
				    }
				    context.local_stream = stream;
				    sendMediaShareRequest(context);
				} else {
				    console.log("unable to capture tab "+context.id);
				    unshare(true, context.id);
				}
			    }
			);
		    }
		});
	    } else {
		context.pending_request_id = chrome.desktopCapture.chooseDesktopMedia(["screen", "window"],
		    function(id) {
    		        if (id) {
			    var captureOptions = { audio:false, video: { mandatory: { chromeMediaSource: "desktop", chromeMediaSourceId: id, maxWidth: screen.width, maxHeight: screen.height } } };
    			    navigator.webkitGetUserMedia(captureOptions,
				    function(stream) {
					if (stream != null) {
					    stream.onended = function() {
					      unshare(false, context.id);
					    }
					    context.video = true;
					    context.local_stream = stream;
					    sendMediaShareRequest(context);
					} else {
					    console.log("unable to capture desktop id "+context.id);
					    unshare(false, context.id);
					}
				    },
				    function() {
					console.log("error while calling getUserMedia for desktop id "+context.id);
					unshare(false, context.id);
				    }
    			    );
			} else {
			    unshare(false, context.id);
			}
		    }
		);
	    }
	} else {
	    console.log("joining conference failed.");
	    connection.close();
	    delete captures[context.id];
	}
    }

    function handleJsonMessage(context, json_msg) {
	switch (json_msg.messageType) {
	    case "CONFERENCE_JOIN_response":
		handleConferenceJoinResponse(context, json_msg);
		break;
	    case "CONFERENCE_KICK_indication":
		unshare(context.tab, context.id);
		break;
	    case "MEDIA_RECEIVE_request":
		handleMediaReceiveRequest(context, json_msg);
		break;
	}
    }

    function sendJoin(context) {
        var message = {messageType: "CONFERENCE_JOIN_request", name: localStorage["ahoyConferenceName"]+" (screen)", password: localStorage["ahoyConferencePassword"], conferenceID: localStorage["ahoyConferenceRoom"], transactionID: generateTransactionID()};
        sendMessage(message, context.gw_connection);
    }

    function checkCameraControl(contentPort) {
	if (cameraWs) {
	    cameraWs.onclose = null;
	    cameraWs.close();
	}
	cameraWs = new WebSocket("ws://localhost:40404", "cameracontrol-protocol");
	try {
	    cameraWs.onopen = function() {
		cameraWs.send(JSON.stringify({cameras:{}}));
	    };
	
	    cameraWs.onmessage = function(msg) {
	        var json_msg = JSON.parse(msg.data);
	        contentPort.postMessage(msg);
	    };
	    
	    cameraWs.onclose = function() {
	        cameraWs = null;
	    }
	} catch (exception) {
	    console.log("exception: "+exception);
	}
    }

    function connectAndJoin(tab, id, audio, video) {
	console.log("connectAndJoin: tab "+tab+ " id "+id);
	var ws_connection = null;
	var gwUrl = localStorage["ahoyConferenceWsUrl"];;
	var context = new TabCaptureContext(id, tab);
	context.audio = audio;
	context.video = video;
	
	captures[id] = context;
	console.log("captures["+id+"]");
	
	if (gwUrl.substring(0, 2) === "ws") {
	    /* ws or wss url */
	    context.gw_connection = new WebSocket(gwUrl, "conference-protocol");
	    try {
		context.gw_connection.onopen = function() {
		    sendJoin(context);
		};
	
		context.gw_connection.onmessage = function(msg) {
	    	    handleJsonMessage(context, JSON.parse(msg.data));
		};
	    
		context.gw_connection.onclose = function() {
		    unshare(tab, id);
		}
	    } catch (exception) {
		console.log("exception: "+exception);
	    }
	}
    }

    chrome.extension.onConnect.addListener( function(port) {  
	console.log("onConnect: port = "+port.name);
	if ((port.name != null) && (port.name == "background")) {
	    /* messages from popup.js */
	    port.onMessage.addListener(function(msg) {    
		console.log("background.onMessage: "+JSON.stringify(msg));
		if (msg.share != null) {
		    if (msg.share.tab != null) {
    			if (msg.share.tab.id != null) {
			    connectAndJoin(true, msg.share.tab.id, msg.share.tab.audio, msg.share.tab.video);
			    console.log("user wants to share tab.id "+msg.share.tab.id);
			}
		    } else if (msg.share.desktop != null) {
			    console.log("user wants to share desktop/window ");
			    connectAndJoin(false, createUniqueId(), false, true);
		    }
		} else if (msg.status != null) {
		    console.log("status " + msg.status.id);
		    if (captures[msg.status.id] != null) {
			console.log("already sharing tab "+msg.status.id);
			/* sharing this tab */
			port.postMessage({status:{sharing: true}});
		    } else {
			console.log("not yet sharing tab "+msg.status.id);
			/* not sharing this tab */
			port.postMessage({status:{sharing: false}});
		    }
		} else if (msg.unshare != null) {
		    if (msg.unshare.tab != null) {
    			if (msg.unshare.tab.id != null) {
			    console.log("user wants to unshare tab.id "+msg.unshare.tab.id);
			    unshare(true, msg.unshare.tab.id);
			}
		    } else if (msg.unshare.desktop != null) {
			console.log("user wants to unshare desktop.id "+msg.unshare.desktop.id);
		    }
		} else if (msg.config != null) {
		    console.log("autoconfig: "+JSON.stringify(msg));
		}
	    });
	} else if ((port.name != null) && (port.name == "ahoyconference")) {
	    /* messages from content.js */
	    contentScriptPorts.push(port);
	    port.onMessage.addListener(function(msg) {
		console.log("content.js : "+JSON.stringify(msg));
		if (msg.event == "joinedConference") {
		    localStorage["ahoyConferenceWsUrl"] = msg.wsUrl;
		    localStorage["ahoyConferenceRoom"] = msg.room;
		    localStorage["ahoyConferenceName"] = msg.name;
		    if (msg.password) { 
			localStorage["ahoyConferencePassword"] = msg.password;
		    } else {
			delete localStorage["ahoyConferencePassword"];
		    }
		    checkCameraControl(port);
		} else if (msg.event == "controlCamera") {
		    if (cameraWs) {
			cameraWs.send(JSON.stringify(msg.control));
		    }
		}
	    });
	    
	    port.onDisconnect.addListener(function() {
		var i = 0;
		for (i = 0; i < contentScriptPorts.length; i++) {
		    if (contentScriptPorts[i] == port) {
			contentScriptPorts.splice(i, 1);
			return;
		    }
		}
	    });
	}
    });

    function unshare(tab, id) {
	if (captures[id] != null) {
	    console.log("unshare: tab "+tab+ " id "+id);
	    try {
		if (captures[id].gw_connection) {
		    captures[id].gw_connection.close();
		    captures[id].gw_connection = null;
		}
		if (captures[id].peer_connection) {
		    captures[id].peer_connection.close();
		    captures[id].peer_connection = null;
		}
		if (captures[id].local_stream) {
		    captures[id].local_stream.stop();
		    captures[id].local_stream = null;
		}
		if (captures[id].pending_request_id != null) {
		    chrome.desktopCapture.cancelChooseDesktopMedia(captures[id].pending_request_id);
		}
		delete captures[id];
	    } catch (error) {
		console.log("unshare: "+error);
	    }
	}
    }
    
    chrome.tabs.onRemoved.addListener(function(tabID, removeInfo) {
	    if (captures[tabID] != null) {
		console.log("onRemoved "+tabID+ " "+captures[tabID]);
		unshare(true, tabID);
	    }
	}
    );

    function onUpdated(tabID, changeInfo, tab) {
	if (captures[tabID] == null) return;
	    if (changeInfo.url != null) {
	    sendMessage({messageType: "CHAT_MESSAGE_request", message:{text: JSON.stringify({chat:changeInfo.url})}, transactionID: generateTransactionID()}, captures[tabID].gw_connection);
	}
    }
    
    chrome.tabs.onUpdated.addListener(onUpdated);

