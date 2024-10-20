//import { setupReadButton } from './modules/ScreenReader.js'

let recognition;
let isListening = false;
//Taking sppech from the Windows default Speech recogniser
function startVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) 
    {
        console.error("Speech recognition is'nt supported by this browser.");
        return;
    }
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';// Here we are selecting English for now we will develop for Indian languages also
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onstart = () => 
    {
        console.log("Voice recognition has started.");
        toggleButton(true);
    };
    recognition.onresult = (event) => 
    {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        console.log('Recognized:', transcript);
        handleVoiceCommand(transcript);
    };
    recognition.onerror = (event) => 
    {
        console.error("Recognition error:", event.error);
        stopVoiceRecognition();
    };
    recognition.onend = () => 
    {
        console.log("Voice recognition has ended.");
        toggleButton(false);
    };
    recognition.start();
}
function stopVoiceRecognition()// To stop the voice Recognition 
{
    if (recognition) 
    {
        recognition.stop();
        console.log("Voice recognition is stopped by the user.");
        toggleButton(false);
    }
}
function handleVoiceCommand(command)// The inbuilt commands which will work
{
    if (command.includes('scroll down')) 
    {
        window.scrollBy(0, 500);
    } 
    else if (command.includes('scroll up')) 
    {
        window.scrollBy(0, -500);
    } 
    else if (command.includes('go back')) 
    {
        window.history.back();
    } 
    else if (command.includes('go forward'))
    {
        window.history.forward();
    }
    else if (command.includes('scroll to end')) 
    {
        window.scrollTo(0, document.body.scrollHeight);
    } 
    else if (command.includes('scroll to top')) 
    {
        window.scrollTo(0, 0);
    } 
    else if (command.includes('stop listening')) 
    {
        stopVoiceRecognition();
        isListening = false;
    }
    else if (command.includes('new tab')) 
    {
        window.open('https://www.google.com/', '_blank');
    }
    else if (command.includes('open youtube')) 
    {
        window.open('https://www.youtube.com/');
    } 
    else if (command.includes('open facebook'))
    {
        window.open('https://www.facebook.com/');
    }
    else 
    {
        console.log("Unrecognized command:", command);
    }
}
function injectButton() // For the start and stop buttons 
{
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggleBtn1";
    toggleButton.textContent = "Start Listening";
    toggleButton.style.position = "fixed";
    toggleButton.style.bottom = "50px";
    toggleButton.style.right = "50px";
    toggleButton.style.zIndex = 10000;
    toggleButton.style.padding = "10px";
    toggleButton.style.backgroundColor = "green";
    toggleButton.style.color = "white";
    toggleButton.style.border = "none";
    toggleButton.style.borderRadius = "5px";
    toggleButton.style.cursor = "pointer";
    document.body.appendChild(toggleButton);
    toggleButton.addEventListener("click", () => {
        //Action Listener for click to start and stop respectively
        if (!isListening) 
        {
            startVoiceRecognition();
            isListening = true;
        } else 
        {
            stopVoiceRecognition();
            isListening = false;
        }
    });
}
function toggleButton(listening) 
{
    const toggleButton = document.getElementById("toggleBtn1");
    if (listening) {
        toggleButton.textContent = "Stop Listening";
        toggleButton.style.backgroundColor = "red";
    }else {
        toggleButton.textContent = "Start Listening";
        toggleButton.style.backgroundColor = "green";
    }
}//To change the button color and text on clicking
injectButton();
// Add a button to toggle detox search
const toggleButto= document.createElement('button');
toggleButto.innerText = 'Detox Search: OFF';
toggleButto.style.position = 'fixed';
toggleButto.style.top = '250px';
toggleButto.style.right = '10px';
toggleButto.style.padding = '10px 20px';
toggleButto.style.backgroundColor = '#add8e6';
toggleButto.style.color = '#fff';
toggleButto.style.border = 'none';
toggleButto.style.borderRadius = '5px';
toggleButto.style.cursor = 'pointer';
document.body.appendChild(toggleButto);
//toggleButto.innerText = 'Detox Search: ON';
let isDetoxSearchOn = false; // Initially, detox search is off
toggleButto.addEventListener('click', () => {
    isDetoxSearchOn = !isDetoxSearchOn;
    toggleButto.innerText = isDetoxSearchOn ? 'Detox Search: ON' : 'Detox Search: OFF';
    if (isDetoxSearchOn) {
        blurNegnews();
        hideNegContent();
    } else {
        location.reload(); // Reload the page to reset the normal content
    }
});

//  detox search is only applied when the toggle is ON
window.addEventListener('load', () => {
    if (isDetoxSearchOn) {
        blurNegnews();
        hideNegContent();
    }
});
//for ScreenReader
const button = document.createElement('button');
button.textContent = 'Read Content';
button.style.position = 'fixed';
button.style.top = '200px';
button.style.right = '10px';
button.style.zIndex = '9999'; 
button.style.backgroundColor = '#4CAF50';
button.style.color = 'white';
button.style.border = 'none';
button.style.padding = '10px';
button.style.cursor = 'pointer';
button.style.borderRadius = '5px';
button.style.fontSize = '14px';
document.body.appendChild(button);

button.addEventListener('click', () => {
    if (isReading) {
        stopReading();
    } else {
        readPageContent();
    }
});

window.addEventListener('load', () => {
    document.body.appendChild(button);
});
//setupReadButton();
let zoomFactor = 1.0;
let contrastValue = 1.0;
let mediaRecorder; 
let recordedChunks = [];

function changeBackgroundColor(color) {
    document.documentElement.style.setProperty('--bg-color', color); 
    const style = document.createElement('style');
    style.innerHTML = `
        * {
            background-color: var(--bg-color) !important;
        }
    `;
    document.head.appendChild(style);
}

function zoomPage(factorChange) {
    zoomFactor += factorChange;
    document.body.style.zoom = zoomFactor;
}

function changeContrast(contrast) {
    document.body.style.filter = `contrast(${contrast})`;
}
//sc
function createButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'feature-buttons'; 
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.top = '50px'; 
    buttonContainer.style.left = '10px';
    buttonContainer.style.zIndex = 9999;
    buttonContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    buttonContainer.style.padding = '10px';
    buttonContainer.style.borderRadius = '5px';
    buttonContainer.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    buttonContainer.style.display = 'none'; 
    buttonContainer.style.display = 'grid';
    buttonContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    buttonContainer.style.gridGap = '10px';

    const startButton = createButtonWithImage('Start Video', 'start_video');
    const stopButton = createButtonWithImage('Stop Video', 'stop_video', true);
    const zoomInButton = createButtonWithImage('Zoom In', null);
    const zoomOutButton = createButtonWithImage('Zoom Out', null);
    const contrastIncreaseButton = createButtonWithImage('Increase Contrast', null);
    const contrastDecreaseButton = createButtonWithImage('Decrease Contrast', null);
    const bgColorInput = createButtonWithImage('Change BG Color', null, 'color.png', false, true);

    zoomInButton.addEventListener('click', () => zoomPage(0.1));
    zoomOutButton.addEventListener('click', () => zoomPage(-0.1));
    contrastIncreaseButton.addEventListener('click', () => {
        contrastValue += 0.1;
        changeContrast(contrastValue);
    });
    contrastDecreaseButton.addEventListener('click', () => {
        contrastValue = Math.max(0.5, contrastValue - 0.1);
        changeContrast(contrastValue);
    });

    bgColorInput.addEventListener('input', (event) => {
        const color = event.target.value;
        changeBackgroundColor(color);
    });

    buttonContainer.appendChild(startButton);
    buttonContainer.appendChild(stopButton);
    buttonContainer.appendChild(zoomInButton);
    buttonContainer.appendChild(zoomOutButton);
    buttonContainer.appendChild(contrastIncreaseButton);
    buttonContainer.appendChild(contrastDecreaseButton);
    buttonContainer.appendChild(bgColorInput);

    document.body.appendChild(buttonContainer);

    startButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);
}
function createButtonWithImage(text, id, imageSrc, isDisabled = false, isInput = false) {
    const button = document.createElement('button');
    if (isInput) {
        button.style.padding = '0';
    }
    button.style.display = 'flex';
    button.style.flexDirection = 'column';
    button.style.alignItems = 'center';
    if (!isInput) {
        const span = document.createElement('span');
        span.innerText = text;
        button.appendChild(span);
        styleButton(button);
    } else {
        button.style.backgroundColor = 'rgba(255, 255, 255, 0)';
        button.innerHTML = `<input type="color" style="width: 50px; height: 50px;">`;
    }

    if (id) button.id = id;
    if (isDisabled) button.disabled = true;
    return button;
}

function styleButton(button) {
    button.style.padding = '10px 15px';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.fontSize = '16px';
    button.style.color = 'white';

    if (button.id === 'start_video') {
        button.style.backgroundColor = '#28a745'; 
    } else if (button.id === 'stop_video') {
        button.style.backgroundColor = '#dc3545'; 
    }

    button.onmouseover = () => {
        button.style.opacity = '0.8';
    };
    button.onmouseout = () => {
        button.style.opacity = '1';
    };
}

function toggleFeatures() {
    const buttonContainer = document.getElementById('feature-buttons');
    buttonContainer.style.display = buttonContainer.style.display === 'none' ? 'grid' : 'none';
}

function createMainButton() {
    const mainButton = document.createElement('button');
    mainButton.innerText = 'Show Features';
    mainButton.id = 'main_button';
    styleButton(mainButton);

    mainButton.style.position = 'fixed';
    mainButton.style.top = '10px';
    mainButton.style.left = '10px';
    mainButton.style.zIndex = 10000;

    mainButton.addEventListener('click', toggleFeatures);

    document.body.appendChild(mainButton);
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        });

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recorded-video.webm';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            recordedChunks = [];
        };

        mediaRecorder.start();
        document.getElementById('start_video').disabled = true;
        document.getElementById('stop_video').disabled = false;
    } catch (error) {
        console.error('Error starting recording:', error);
        alert('Could not start recording: ' + error.message);
    }
}

function stopRecording() {
    mediaRecorder.stop();
    document.getElementById('start_video').disabled = false;
    document.getElementById('stop_video').disabled = true;
}

window.addEventListener('load', () => {
    createMainButton();
    createButtons(); 
});
// content.js
// Inject the button for font settings
const button2 = document.createElement('button');
button2.id = 'fontSettingsBtn';
button2.innerText = 'Adjust Font Settings';
button2.style.position = 'fixed';
button2.style.bottom = '20px';
button2.style.right = '20px';
button2.style.padding = '10px 20px';
button2.style.fontSize = '16px';
button2.style.zIndex = '9999';
button2.style.backgroundColor = '#007bff';
button2.style.color = '#fff';
button2.style.border = 'none';
button2.style.borderRadius = '5px';
button2.style.cursor = 'pointer';
document.body.appendChild(button2);

// Load the font settings modal when the button is clicked
button2.addEventListener('click', () => {
    loadFontSettingsModal();
});
