const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('development', {
  mode: () => process.env.NODE_ENV || 'production',
})

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})
