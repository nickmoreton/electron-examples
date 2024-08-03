// The page elements to interact with
const chooseFolderButton = document.getElementById('choose-folder')
const cancelButton = document.getElementById('clear-folder')
const textField = document.getElementById('folder-path')
const startButton = document.getElementById('start-processing')

// Disable the start button by default
startButton.setAttribute('disabled', 'disabled')

chooseFolderButton.addEventListener('click', async () => {
    // Call the openDialog function via the preload script
    const folderPath = await window.api.openDialog(
        { properties: ['openDirectory'] }
    )
    // If a folder path is returned, update the text field and enable the start button
    if (folderPath) {
        textField.value = folderPath
        // Enable the start button
        startButton.removeAttribute('disabled')
    }
})

cancelButton.addEventListener('click', () => {
    // Clear the text field and disable the start buttonå
    textField.value = ''
    startButton.setAttribute('disabled', 'disabled')
})

textField.addEventListener('change', () => {
    // Log a message when the text field value changes
    // not required for the functionality of the app
    console.log('Text field has changed')
})

startButton.addEventListener('click', () => {
    // Log the folder path when the start button is clicked
    const folderPath = textField.value
    console.log(`Processing folder: ${folderPath}`)
    // do something here with the folder path
})
