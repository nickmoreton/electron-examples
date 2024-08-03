# Position Window

This implements the [electron-window-state](https://github.com/mawie81/electron-window-state) module to save and restore the window state.

Based of the [quick start](../1_quick_start/README.md) example.

Install the module with:

```bash
# this is a production dependency
npm install electron-window-state
```

## main.js

```js
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
    <title>Position Window</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <div class="container">
      <h1>Position Window</h1>
      <p>
        The window will reopen in the last position it was before been closed
      </p>
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
// empty
```

## preload.js

```js
// empty
```
