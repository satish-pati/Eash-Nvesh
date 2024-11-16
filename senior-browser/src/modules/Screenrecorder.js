
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