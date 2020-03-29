const { app, BrowserWindow } = require('electron')
const {} = require('electron-is-dev')
let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadURL("http://localhost:3000")
})
