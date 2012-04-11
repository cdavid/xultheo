/**
* debugging goes here
*/
Components.utils.import("resource://gre/modules/NetUtil.jsm"); 
Components.utils.import("resource://gre/modules/FileUtils.jsm");

function jsdump(str)
{

  
  var logFile = new FileUtils.File("D:\\logFF.txt");
  var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"].
               createInstance(Components.interfaces.nsIFileOutputStream);
  foStream.init(logFile, 0x02 | 0x10, 0666, 0);
  var converter = Components.classes["@mozilla.org/intl/converter-output-stream;1"].
                createInstance(Components.interfaces.nsIConverterOutputStream);
  converter.init(foStream, "UTF-8", 0, 0);
  converter.writeString(str);
  converter.writeString("\n");
  converter.close(); // this closes foStream


  Components.classes['@mozilla.org/consoleservice;1']
  .getService(Components.interfaces.nsIConsoleService)
  .logStringMessage(str);
}

function toOpenWindowByType(inType, uri) {
  var winopts = "chrome,extrachrome,menubar,resizable,scrollbars,status,toolbar";
  window.open(uri, "_blank", winopts);
}

function $() { return document.getElementById(arguments[0]); }
function $F() { return document.getElementById(arguments[0]).value; }

function getKeyCode(ev) { 
  if (window.event) return window.event.keyCode; 
  return ev.keyCode; 
}

window.onload = function(){ 
  //start_venkman(); 
  // window.open("chrome://inspector/content/inspector.xul", "", "chrome");
  //window.open("chrome://inspector/content/inspector.xul", "", "chrome,width=600,height=300");
}

function scrollIntoView(sb, el) {
   var xpcomInterface = sb.boxObject.QueryInterface(Components.interfaces.nsIScrollBoxObject);
   xpcomInterface.ensureElementIsVisible(el);
}

var console = {
  log : function(str) {
    //dump(str + "\n") && jsdump(str + "\n");
  }
};