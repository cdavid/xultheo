var sendmsg = null;
var forAlex = "";


window.onload = function(){
	//arg1 : function for browser event
	//arg2 : services
	//how to produce buttons:
	// <button label="Above" image="happy.png" orient="vertical"/>
	if (!("arguments" in window) || !(window.arguments.length >= 2))
		return;
	sendmsg = window.arguments[0];
	var services = window.arguments[1];
	forAlex = window.arguments[2];

	window.width = 100 * services.length;

	for (var i = services.length - 1; i >= 0; i--) {
		var bbox = document.getElementById("services");
		var button = document.createElement("button");
		button.setAttribute("id", services[i].name);
		button.setAttribute("label", services[i].label);
		button.setAttribute("image", services[i].iconURI);
		button.setAttribute("orient", "vertical");
		button.setAttribute("width", "85");
		button.setAttribute("onclick", "handleClick(this);");
		bbox.appendChild(button);
	};
}

var handleClick = function(obj) {
	sendmsg("theo.click", obj.id, forAlex);
	window.close();
}