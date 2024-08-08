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
