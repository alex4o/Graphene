var app = require("app")

var BrowserWindow = require("browser-window")

app.on("ready", function(){
	var win = new BrowserWindow({
		width: 1920,
		height: 1080
	})

	win.loadURL("file://" + __dirname + "/../out/index.html")
})
