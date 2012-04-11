var sendmsg = null;
var forAlex = "";

window.onload = function() {
	//arg1: function for browser event
	//arg2: url

	if (!("arguments" in window) || !(window.arguments.length >= 2))
		return;
	sendmsg = window.arguments[0];
	var url = window.arguments[1];
	forAlex = window.arguments[2];

	window.width = 300;
	window.height = 300;
	var browser = document.getElementById("BROWSER");
	browser.setAttribute("src", url);
}

var Sissi = {
	myListener: function(evt) {
		//TODO: redo
		sendmsg(
			evt.target.getAttribute("cd"), 
			evt.target.getAttribute("symbol"),
			forAlex
			);
	}
}

document.addEventListener("SissiNavigateEvent", function(e) { 
	Sissi.myListener(e); 
}, false, true);