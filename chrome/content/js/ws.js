var DEBUG = true;
var browserWindow = null;
var menuWindow = null;
var urlWindow = null;

var room = {
	join: function() {
    	var loc = "ws://localhost:8181/";
    	if (window.MozWebSocket) {
       		this._ws=new MozWebSocket(loc);        	  
    	} else {
      		this._ws=new WebSocket(loc);
    	}
	    this._ws.onopen=this._onopen;
    	this._ws.onmessage=this._onmessage;
    	this._ws.onclose=this._onclose;
    	return this._ws;
	},

  	_onopen: function() {
  	},

  	send: function(message) {
    	if (!this._ws) 
			this.join();    
    	if (this._ws)
      	this._ws.send(message);
  	},      

  	_onmessage: function(m) {
    	if (m.data) {
			//try to transform JSON to the object
			jsdump(m.data);
			var obj = JSON.parse(m.data);			
			//we expect an object of type:
			// { 
			//   "action"     : "",
			//   "params"     : [
			//     { "pName" : "p1",
			//       "pValue": "v1"
			//     }, ...
			//   ]
			// }
		
			if (!obj.action) return;
		
			switch (obj.action) {
				case "init":
					var msg = {"action":"whoami", 
							"reqid": Math.floor(Math.random()*999),
							"param":[
								{"pName":"type", "pValue":"theo"},
								{"pName":"render", "pValue":"xul"}
							]};
					var str = JSON.stringify(msg);
					this.send(str);
					break;
				case "theo.menuWindow":
					if (!obj.param) return;
					var param = obj.param;
					var posx = 0, posy = 0, height = -1, width = -1;
					var services = [];
					var forAlex = "";
					for (var i = 0; i < param.length; i++) {
						if (!param[i].pName || !param[i].pValue) continue;

						if (param[i].pName == "pos") {
							var pos = param[i].pValue.split(",", 4);
							if (pos.length < 2) return;
							posx = pos[0];
							posy = pos[1];
							if (pos.length == 4) {
								height = pos[2];
								width = pos[3];
							} else {
								height = 100;
								width = 100;
							}


						} else if (param[i].pName.substring(0,7) == "service") {
							var srv = param[i].pValue.split(",", 3);
							services[services.length] = {"name": srv[0], "label":srv[1], "iconURI": srv[2]};
						} else if (param[i].pName == "forAlex") {
							forAlex = param[i].pValue;
						}
					}

					// See https://developer.mozilla.org/en/DOM/window.openDialog#Passing_extra_parameters_to_the_dialog for more docs
					if (menuWindow && !menuWindow.closed) {
						//TODO: figure out this code -- when you have a window already open
						// does it need to be closed?
						menuWindow.close();
						// menuWindow.blur();
						// menuWindow.moveTo(posx, posy);
						// if (height != -1 && width != -1) {
						// 	menuWindow.resizeTo(width, height);
						// }
						//
					}

					menuWindow = window.openDialog(
						"chrome://myapp/content/menuWindow/menu.xul",
						"Menu",
						"chrome,left="+posx+",top="+posy+",height="+height+",width="+width+",alwaysRaised=true,popup,titlebar=yes,dialog=yes,close=yes",						
						function(action, buttonid, forAlex){
							var obj = {"action":action, 
								param: [
									{"pName":"button", "pValue": buttonid},
									{"pName":"forAlex", "pValue":forAlex}
									]
								};
			 				var msg = JSON.stringify(obj);			 				
			 				room.send(msg);
						},
						services,
						forAlex
					);
					menuWindow.onload = function() {

					}
					menuWindow.focus();

					break;
				case "theo.urlWindow":
					if (!obj.param) return;
					var param = obj.param;
					var posx = 0, posy = 0, height = -1, width = -1;
					var url = "";
					var forAlex = "";
					for (var i = 0; i < param.length; i++) {
						if (!param[i].pName || !param[i].pValue) continue;

						if (param[i].pName == "pos") {
							var pos = param[i].pValue.split(",", 4);
							if (pos.length < 2) return;
							posx = pos[0];
							posy = pos[1];
							if (pos.length == 4) {
								height = pos[2];
								width = pos[3];
							} else {
								height = 200;
								width = 300;
							}
						} else if (param[i].pName == "url") {
							url = param[i].pValue;
						} else if (param[i].pName == "forAlex") {
							forAlex = param[i].pValue;
						}
					}

					// See https://developer.mozilla.org/en/DOM/window.openDialog#Passing_extra_parameters_to_the_dialog for more docs
					if (urlWindow && !urlWindow.closed) {
						//TODO: figure out this code -- when you have a window already open
						// does it need to be closed?
						urlWindow.close();						
					}

					urlWindow = window.openDialog(
						"chrome://myapp/content/urlWindow/urlWindow.xul",
						"Service",
						"chrome,left="+posx+",top="+posy+",height="+height+",width="+width+",alwaysRaised=true,popup,titlebar=yes,dialog=yes,close=yes",						
						function(action, clickid, forAlex){
							var obj = {
								"action":action, 
								param: [
									{"pName":"click", "pValue": clickid},
									{"pName":"forAleX", "pValue":forAlex}
								]
							};
			 				var msg = JSON.stringify(obj);			 				
			 				room.send(msg);
						},
						url,
						forAlex
					);
					urlWindow.onload = function() {

					}
					urlWindow.focus();


					break;
				default:
					break;
			}
		}
  },

  _onclose: function(m) {
    this._ws=null;          
  }
};
