# A hello world Electron app

This example show how to include browser-sync for live reloading of the app.

Based of the [quick start](../1_quick_start/README.md) example.

## main.js

```js
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const mode = process.env.NODE_ENV || 'production' // the development mode or not

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
  ipcMain.handle('mode', () => {
    return mode === 'development' ? 'development' : 'production' // return the mode
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
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' http://localhost:3000; connect-src 'self' http://localhost:3000 ws://localhost:3000"
    />
    <title>Hello World!</title>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <div class="container">
      <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
    <p>To test a full reload change this text: the page should do a full reload</p>

    <input type="text" placeholder="text added here should remoain after a styling update: Hot Reload!">
    
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

input {
  width: 100%;
}
```

# renderer.js

```js
const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), 
    Node.js (v${window.versions.node()}), 
    and Electron (v${window.versions.electron()})`

const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
}

func()

console.log(development.mode()) // prints out 'development'

// this calls the function to get the mode and checks if it is in development mode
// the function is available because it was exposed in the preload script
if (development.mode() === 'development') {
    try {
        var script = document.createElement('script');
        // if ('async') {
        // script.async = true;
        // }
        script.src = 'http://localhost:3000/browser-sync/browser-sync-client.js?v=3.0.2';
        // script.setAttribute('nonce', 'bs123');
        if (document.body) {
            document.body.appendChild(script);
        } else if (document.head) {
            document.head.appendChild(script);
        }
    } catch (e) {
        console.error("Browsersync: could not append script tag", e);
    }
}
```

## preload.js

```js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
  ping: () => ipcRenderer.invoke('ping'),
})

contextBridge.exposeInMainWorld('development', {
  mode: () => process.env.NODE_ENV || 'production',
})
```

## package.json
```json
{
  "name": "electron-quick-start",
  "version": "1.0.0",
  "description": "Minimal Electron",
  "main": "main.js",
  "scripts": {
    "start": "NODE_ENV=development electron .",
    // the script below could be further modified to run electron as well
    // one for another day...
    "dev": "browser-sync start --localOnly --files '**/*'"
  },
  "repository": "",
  "author": "Nick Moreton",
  "devDependencies": {
    "browser-sync": "^3.0.2",
    "electron": "^31.3.1"
  }
}
```
