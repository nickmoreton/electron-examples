const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron')
const path = require('node:path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 960,
    x: 100,
    y: 100,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // Load the index.html of the app.
  mainWindow.loadFile('index.html')

  mainWindow.webContents.openDevTools(
    // Open the DevTools and position them to the right.
    { mode: 'right' }
  )
}


app.whenReady().then(() => {
  ipcMain.handle('open-dialog', async () => {
    // Show a dialog that allows the user to select a folder.
    // The dialog returns an array of paths.
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    })
    if (!result.canceled) {
      // Return the first path in the array.
      return result.filePaths[0]
    } else {
      return null
    }
  })

  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
