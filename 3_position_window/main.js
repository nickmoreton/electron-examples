const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

// The windowStateKeeper module is used to keep the window state between app launches.
const windowStateKeeper = require('electron-window-state');

// Create the window using the state information
const createWindow = (mainWindowState) => {


  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // Use the window state information
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    // end of window state information
    minWidth: 600,
    minHeight: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // Register the window state keeper
  mainWindowState.manage(mainWindow);

  // Load the index.html of the app.
  mainWindow.loadFile('index.html')

  mainWindow.webContents.openDevTools(
    // Open the DevTools and position them to the right.
    { mode: 'right' }
  )

}

app.whenReady().then(() => {

  // Load the previous state with fallback to defaults
  const mainWindowState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600,
  });

  createWindow(mainWindowState)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
