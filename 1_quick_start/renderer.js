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
