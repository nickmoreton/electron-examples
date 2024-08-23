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
