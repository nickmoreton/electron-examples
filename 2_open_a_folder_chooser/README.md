# Open a folder chooser

This example shows how to open a folder chooser dialog in an Electron app. The dialog is opened when the user clicks a button in the app. The selected folder path is then displayed in the app.

Based of the [quick start](../1_quick_start/README.md) example.

## main.js

```js
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

```

## index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <link href="./styles.css" rel="stylesheet" />
    <title>Open a folder chooser</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <div class="container">
      <h1>Open a folder chooser</h1>
      <!-- buton that opens the folder chooser -->
      <button id="choose-folder">Choose a folder</button> 
      <!-- input that shows the selected folder path -->
      <input id="folder-path" disabled />
      <!-- buttons to clear the selected folder path -->
      <button id="clear-folder">Cancel</button>
      <!-- button to start processing the selected folder -->
      <button id="start-processing">Start Processing</button>
    </div>

    <script src="./renderer.js"></script>
  </body>
</html>
```

## styles.css

```css
/* styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.container {
  width: 80%;
  margin: auto;
}
```

# renderer.js

```js
// The page elements to interact with
const chooseFolderButton = document.getElementById('choose-folder')
const cancelButton = document.getElementById('clear-folder')
const textField = document.getElementById('folder-path')
const startButton = document.getElementById('start-processing')

// Disable the start button by default
startButton.setAttribute('disabled', 'disabled')

chooseFolderButton.addEventListener('click', async () => {
    // Call the openDialog function via the preload script
    const folderPath = await window.api.openDialog(
        { properties: ['openDirectory'] }
    )
    // If a folder path is returned, update the text field and enable the start button
    if (folderPath) {
        textField.value = folderPath
        // Enable the start button
        startButton.removeAttribute('disabled')
    }
})

cancelButton.addEventListener('click', () => {
    // Clear the text field and disable the start buttonå
    textField.value = ''
    startButton.setAttribute('disabled', 'disabled')
})

textField.addEventListener('change', () => {
    // Log a message when the text field value changes
    // not required for the functionality of the app
    console.log('Text field has changed')
})

startButton.addEventListener('click', () => {
    // Log the folder path when the start button is clicked
    const folderPath = textField.value
    console.log(`Processing folder: ${folderPath}`)
    // do something here with the folder path
})
```

## preload.js

```js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  // Expose a method to the renderer process that invokes the open-dialog channel
  openDialog: () => ipcRenderer.invoke('open-dialog'),
})
```
