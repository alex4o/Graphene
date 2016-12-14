var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;

app.on("ready", function(){
	var win = new BrowserWindow({
		width: 1920,
		height: 1080,
		"auto-hide-menu-bar": true,
		backgroundColor: '#00AFEF',
		show: false
	})


	win.loadURL("file://" + __dirname + "/out/game.html")
	win.once('ready-to-show', () => {
		win.show()
		win.setFullScreen(true)
	})

	win.once('closed', () => {
		app.quit()
	})

	// win.toggleDevTools()

})
