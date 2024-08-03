const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  // Expose a method to the renderer process that invokes the open-dialog channel
  openDialog: () => ipcRenderer.invoke('open-dialog'),
})
