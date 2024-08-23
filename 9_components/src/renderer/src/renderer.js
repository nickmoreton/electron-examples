import IpcButton from './components/IpcButton'

function init() {
  window.addEventListener('DOMContentLoaded', () => {
    doAThing()
    customElements.define('ipc-button', IpcButton)
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
