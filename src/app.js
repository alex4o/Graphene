var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;

app.on("ready", function(){
	var win = new BrowserWindow({
		width: 1920,
		height: 1080,
		"auto-hide-menu-bar": true
	})


	win.loadURL("file://" + __dirname + "/out/game.html")
	win.toggleDevTools()
	win.setFullScreen(true)

})
