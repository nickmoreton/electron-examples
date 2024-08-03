# A hello world Electron app

This is a pretty basic Electron app that displays a window with a greeting and some information about the versions of Chrome, Node.js, and Electron that it is using. The app also logs a message to the console when it is run.

Taken mostly from the [Building your First App](https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app).

## main.js

```js
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

/**
 * Creates a browser window and loads the index.html of the app.
 * @function createWindow
 * @returns {void}
 */
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })


  mainWindow.loadFile('index.html')


  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
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
<!-- 
  This is the HTML file for the Electron quick start project.
  It contains the basic structure of an HTML document with a title, stylesheet, and a script.
  The content security policy is set to only allow scripts from the same origin.
  The stylesheet is linked using the "link" tag with the "rel" attribute set to "stylesheet".
  The main content of the page is wrapped in a container div.
  The page displays a heading, a waving hand emoji, and an empty paragraph with the id "info".
  The script file "renderer.js" is included at the end of the body.
-->
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
    <title>Hello World!</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <div class="container">
      <h1>Hello from Electron renderer!</h1>
      <p>👋</p>
      <p id="info"></p>
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

p {
  margin: 0;
  padding: 0;
}
```

# renderer.js

```js
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), 
    Node.js (v${window.versions.node()}), 
    and Electron (v${window.versions.electron()})`

/**
 * Executes an asynchronous function that pings the window versions and logs the response.
 * @returns {Promise<void>} A promise that resolves when the function completes.
 */
const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
}

func()
```

## preload.js

```js
/**
 * Preload script for Electron application.
 * @module preload
 * @requires electron
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
  ping: () => ipcRenderer.invoke('ping'),
})
```
