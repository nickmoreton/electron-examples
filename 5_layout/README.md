# Layout & Styles

In this example we will look at how to add styles to our Electron app and how to layout the app.

It offers a dark mode and a light mode.

Based of the [reload](../4_reload/) example.

## main.js

```js
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
      content="default-src 'self'; script-src 'self' http://localhost:3000; connect-src 'self' http://localhost:3000 ws://localhost:3000; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self';"
    />
    <title>Hello World!</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles/reset.css" />
    <link rel="stylesheet" href="styles/global.css" />
    <link rel="stylesheet" href="styles/elements.css" />
    <link rel="stylesheet" href="styles/components.css" />
    <link rel="stylesheet" href="styles/theme.css" />
  </head>
  <body>
    <main>
      <input type="text" placeholder="A placeholder" /> <br />
      <br />

      <a href="#">A link</a> <br />
      <br />

      <button>A button</button> <br />
      <br />

      <input type="submit" value="Submit me" /> <br />
      <br />

      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        similique itaque voluptatum, corrupti voluptas error porro velit rerum
        sint repudiandae, reiciendis qui asperiores aliquam ea culpa numquam
        quam, nihil facilis.
      </p>

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est quo sint
        quibusdam, nisi recusandae fuga harum adipisci vel, dolorum optio neque
        molestiae placeat. Praesentium sit incidunt non! Eligendi, itaque culpa.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
        nesciunt magni veritatis ea eaque omnis soluta placeat repudiandae,
        laboriosam cumque rerum? Quisquam dolor illo at provident natus
        repudiandae? Veniam, voluptatem.
      </p>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
        voluptas illo debitis vero doloremque fugit consequatur atque laboriosam
        commodi, modi, repudiandae soluta odio eos ratione amet perspiciatis
        iusto totam molestiae.
      </p>

      <textarea rows="10">
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, adipisci provident atque beatae totam </textarea
      >

      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
            <td>Row 1, Cell 3</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
            <td>Row 2, Cell 3</td>
          </tr>
          <tr>
            <td>Row 3, Cell 1</td>
            <td>Row 3, Cell 2</td>
            <td>Row 3, Cell 3</td>
          </tr>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
            <td>Row 1, Cell 3</td>
          </tr>
          <tr>
            <td>Row 2, Cell 1</td>
            <td>Row 2, Cell 2</td>
            <td>Row 2, Cell 3</td>
          </tr>
          <tr>
            <td>Row 3, Cell 1</td>
            <td>Row 3, Cell 2</td>
            <td>Row 3, Cell 3</td>
          </tr>
        </tbody>
      </table>

      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    </main>

    <footer>
      <p>Current theme source: <strong id="theme-source">System</strong></p>
      <button id="toggle-dark-mode">Toggle Dark Mode</button>
      <button id="reset-to-system">Reset to System Theme</button>
    </footer>

    <script src="scripts/renderer.js"></script>
  </body>
</html>
```

## styles.css

```css
/* view the style files */
```

# renderer.js

```js
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

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
})
```

## preload.js

```js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('development', {
  mode: () => process.env.NODE_ENV || 'production',
})

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})
```

## package.json
```json
{
  "name": "electron-quick-start",
  "version": "1.0.0",
  "description": "Minimal Electron",
  "main": "./main/main.js",
  "scripts": {
    "start": "NODE_ENV=development electron .",
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
