const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('node:path')
const mode = process.env.NODE_ENV || 'production'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 960,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js')
    }
  })
  
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  
  mainWindow.webContents.openDevTools()
}


app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  ipcMain.handle('mode', () => {
    return mode === 'development' ? 'development' : 'production'
  })
  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })
  
  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
