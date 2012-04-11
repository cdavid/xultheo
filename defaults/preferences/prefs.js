pref("toolkit.defaultChromeURI", "chrome://myapp/content/main.xul");
pref("toolkit.defaultChromeFeatures", "titlebar=no,left=300,top=100,resizable=no,dialog=no");
/* modify above titlebar=no to titlebar=yes to see an empty XUL window */
pref("dom.allow_scripts_to_close_windows", true);

/* debugging prefs */
pref("browser.dom.window.dump.enabled", true);
pref("javascript.options.showInConsole", true);
pref("javascript.options.strict", true);
pref("nglayout.debug.disable_xul_cache", true);
pref("nglayout.debug.disable_xul_fastload", true);
pref("devtools.chrome.enabled", true);
pref("extensions.logging.enabled", true);
pref("dom.report_all_js_exceptions", true);


