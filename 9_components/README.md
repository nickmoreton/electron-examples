# 9_components

Based off of [8_make-from_scrtip](../8_make_from_script/)

## First Web Component

```javascript
export default class IpcButton extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    // create a button element
    const button = document.createElement('button')
    button.id = 'ipcHandler'

    if (this.getAttribute('className')) {
      button.setAttribute('class', this.getAttribute('className'))
    }

    if (this.getAttribute('callbackName')) {
      button.addEventListener('click', () => {
        // window.electron.ipcRenderer.send(this.getAttribute('callbackName'))
        this.callback(this.getAttribute('callbackName'))
      })
    }

    const slot = document.createElement('slot')
    button.appendChild(slot)

    // append the button to the shadow root
    this.shadowRoot.appendChild(button)

    // create a style element
    const style = document.createElement('style')
    // use the global styles
    style.textContent = `
      @import '../../../assets/main.css';
    `

    // append the style to the shadow root
    this.shadowRoot.appendChild(style)
  }

  callback(name) {
    window.electron.ipcRenderer.send(name)
  }
}
```

## Register the component

```javascript
import IpcButton from './components/IpcButton'

function init() {
  window.addEventListener('DOMContentLoaded', () => {
    doAThing()
    customElements.define('ipc-button', IpcButton) // <---- here
  })
}

function doAThing() {
  const versions = window.electron.process.versions
  replaceText('.electron-version', `Electron v${versions.electron}`)
  replaceText('.chrome-version', `Chromium v${versions.chrome}`)
  replaceText('.node-version', `Node v${versions.node}`)

  // I didn't know ...
  // the ? after ipcHandlerBtn will prevent calling
  // addEventListener if ipcHandlerBtn is null
  const ipcHandlerBtn = document.getElementById('ipcHandler')
  ipcHandlerBtn?.addEventListener('click', () => {
    window.electron.ipcRenderer.send('ping')
  })
}

function replaceText(selector, text) {
  const element = document.querySelector(selector)
  if (element) {
    element.innerText = text
  }
}

init()
```

## Use the component

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Electron</title>
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:"
    />

    <link href="./assets/main.css" type="text/css" rel="stylesheet" />
  </head>

  <body>
    <div id="app" class="container-fluid">
      <img alt="logo" class="logo" src="./assets/electron.svg" />
      <hgroup>
        <h2>Powered by electron-vite</h2>
        <p>Build an Electron app with
          <mark class="">JavaScript</mark></p>
      </hgroup>
      <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
      <div class="actions">
        <div class="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
        </div>
        <div class="action">
          <!-- Demostrate using a custom button that can have a class and callback set -->
          <ipc-button className="contrast" callbackName="ping">Send IPC custom</ipc-button>
          <button id="ipcHandler" target="_blank" rel="noreferrer">Send IPC</button>
        </div>
      </div>

      <ul class="versions">
        <li class="electron-version"></li>
        <li class="chrome-version"></li>
        <li class="node-version"></li>
      </ul>
    </div>

    <script type="module" src="./src/renderer.js"></script>
  </body>
</html>
```

## Run the app

```bash
npm install && npm run dev
```
