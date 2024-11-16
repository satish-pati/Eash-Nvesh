let zoomFactor = 1.0;
let contrastValue = 1.0;
let mediaRecorder;
let recordedChunks = [];
let select = false;
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
function createButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'feature-buttons';
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.top = '0';
    buttonContainer.style.left = '0';
    buttonContainer.style.width = '90vw';  // Set the container to take 3/4 of the screen width
    buttonContainer.style.height = '60vh'; // Decrease the height to around 70% of the screen height
    buttonContainer.style.zIndex = 9999;
    buttonContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    buttonContainer.style.borderBottomRightRadius = '10px';
    buttonContainer.style.padding = '20px';
    buttonContainer.style.display = 'grid';
    buttonContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';  // Larger buttons
    buttonContainer.style.rowGap = '0px';  // Reduced row gap for closer vertical spacing
    buttonContainer.style.columnGap = '25px';  // Set column gap as needed
    buttonContainer.style.color = 'white';
    buttonContainer.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.5)';
    buttonContainer.style.transformOrigin = 'top left';
    buttonContainer.style.transition = 'transform 0.3s ease-in-out';
    buttonContainer.style.transform = 'scale(0)';
    const startButton = createButtonWithImage('Start Video', 'start_video');
    const zoomInButton = createButtonWithImage('Zoom In');
    const zoomOutButton = createButtonWithImage('Zoom Out');
    const contrastIncreaseButton = createButtonWithImage('Increase Contrast');
    const contrastDecreaseButton = createButtonWithImage('Decrease Contrast');
    const bgColorInput = createButtonWithImage('Change BG Color', null, 'color.png', false, true);
    const detoxSearchButton = createButtonWithImage('Detox Search: OFF');
    const readContentButton = createButtonWithImage('Read Content');
    const fontSettingsButton = createButtonWithImage('Adjust Font Settings');
    const downloadButton = createButtonWithImage('Download File');
   //const videoButton = createButtonWithImage('Video Tutorials', 'video_tutorial_button');
    const BlurAdsButton = createButtonWithImage('Blur Ads: OFF');
    const ReallocateButton = createButtonWithImage('Reallocate File');
    const SecurityScanButton = createButtonWithImage('Scan Web');
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


    detoxSearchButton.addEventListener('click', () => toggleDetoxSearch(detoxSearchButton));
    detoxSearchButton.addEventListener('click', toggleFeatures);
    readContentButton.addEventListener('click', toggleReadContent);
    readContentButton.addEventListener('click', toggleFeatures);
    BlurAdsButton.addEventListener('click', () => toggleBlurAdContent(BlurAdsButton));
    BlurAdsButton.addEventListener('click', toggleFeatures);
    fontSettingsButton.addEventListener('click', loadFontSettingsModal); 
    fontSettingsButton.addEventListener('click', toggleFeatures);
    ReallocateButton.addEventListener('click', toggleReallocate);
    ReallocateButton.addEventListener('click', toggleFeatures);
    SecurityScanButton.addEventListener('click', SecurityScan);
    //SecurityScanButton.addEventListener('click', toggleFeatures);
    let select=false;
    downloadButton.addEventListener('click', () => {
        checkLoginBeforeFeatureAccess(() => {
            // Code for the feature that requires login
            console.log("Protected feature accessed!");
          });
        select = !select;
        if (select === true) {
            
          //  downloadButton.innerText = 'Click on a file to download';
        } else {
           // downloadButton.innerText = 'Download File';
        }
        highlightitem(select);
    });
    
   const logoutButton = document.createElement('button');
logoutButton.textContent = "Logout";
logoutButton.style.position = "fixed";
logoutButton.style.bottom = "20px"; // Position from the bottom
logoutButton.style.left = "20px"; // Position from the left
logoutButton.style.zIndex = 1000;
// Styling the button
logoutButton.style.padding = "10px 20px";
logoutButton.style.backgroundColor = "#f44336"; // A red color that stands out
logoutButton.style.color = "white"; // Text color
logoutButton.style.border = "none"; // Remove border
logoutButton.style.borderRadius = "5px"; // Rounded corners
logoutButton.style.cursor = "pointer";
logoutButton.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)"; // Adds a subtle shadow

logoutButton.addEventListener('click', handleLogout);
document.body.appendChild(logoutButton);
    buttonContainer.append(
        startButton, zoomInButton, zoomOutButton, contrastIncreaseButton, contrastDecreaseButton,
        bgColorInput, detoxSearchButton, readContentButton, fontSettingsButton, downloadButton, videoButton,BlurAdsButton,ReallocateButton,SecurityScanButton
    );

    document.body.appendChild(buttonContainer);

    startButton.addEventListener('click', startRecording);
    startButton.addEventListener('click', toggleFeatures);
}
function createButtonWithImage(text, id, imageSrc = '', isDisabled = false, isInput = false) {
    const button = document.createElement('div');
    button.style.display = 'flex';
    button.style.flexDirection = 'column';
    button.style.alignItems = 'center';
    button.style.color = 'white';
    button.style.backgroundColor = 'rgba(51, 51, 51, 0.7)';
    button.style.border = '1px solid rgba(85, 85, 85, 0.7)';
    button.style.padding = '5px';
    button.style.margin = '3px 0';
    button.style.cursor = 'pointer';
    button.style.fontSize = '14px';
    button.style.borderRadius = '15px';
    button.style.transition = 'background-color 0.3s, transform 0.2s';
    button.style.textAlign = 'center';
    button.style.height = '150px';  // Fixed height for buttons
    button.style.width = '100%';  // Make each button take full width within grid cell
    button.style.position = 'relative';


    if (id === 'start_video') {
        imageSrc = 'https://play-lh.googleusercontent.com/DISX7-mPtxpAjv-sRiCDkzQ0I1zRD3pp8EQ__ckPWCTTwGr2EUjTE6yng6lQnlmjmszp';
    } else if (text === 'Zoom In') {
        imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGMD5V96BFDblxP7xMf2ZY_xC2x1gpjzoSLQ&s';
    } else if (text === 'Zoom Out') {
        imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFevrvcCfBDKzkw5xoP_JM-WImqPz8qWVHg&s';
    } else if (text === 'Detox Search: OFF') {  // New case for Detox Search button
        imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2VuFC4jBUGmXe0o4pbwhYNggtN4DyOJY_iA&s';
    } else if (text === 'Read Content') {  // New case for Detox Search button
        imageSrc = 'https://cdn-icons-png.flaticon.com/512/9289/9289709.png';
    } else if (text === 'Adjust Font Settings') {  // New case for Detox Search button
        imageSrc = 'https://cdn-icons-png.freepik.com/512/8144/8144468.png';
    } else if (text === 'Download File') {  // New case for Detox Search button
        imageSrc = 'https://www.citypng.com/public/uploads/preview/download-file-document-blue-outline-icon-png-img-701751694962530gugetptdob.png';
    } else if (text === 'Video Tutorials') {  // New case for Detox Search button
        imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMiZjld3TWP8VEsC605QCl7z5BxfAeBbNhvw&s';
    } else if (text === 'Blur Ads: OFF') {  // New case for Detox Search button
        imageSrc = 'https://img.freepik.com/premium-vector/ad-blocker-icon-vector-image-can-be-used-digital-marketing_120816-168337.jpg';
    } else if (text === 'Reallocate File') {  // New case for Detox Search button
        imageSrc = 'https://cdn-icons-png.flaticon.com/128/2521/2521940.png';
    } else if (text === 'Scan Web') {  // New case for Detox Search button
        imageSrc = 'https://cdn-icons-png.flaticon.com/512/7800/7800278.png';
    }
    else if (text === 'Increase Contrast') {  // New case for Detox Search button
        imageSrc = 'https://cdn-icons-png.freepik.com/512/25/25636.png';
    }
    else if (text === 'Decrease Contrast') {  // New case for Detox Search button
        imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaVWPFreElWI1l8TGaWo6EHVYBvv04qGwmnA&s';
        }
    // Add other cases for buttons here as needed...

    // Create image element if needed
    if (isInput) {
        const input = document.createElement('input');
        input.type = 'color';
        input.style.width = '30px';
        input.style.height = '30px';
        input.style.marginBottom = '10px';
        button.appendChild(input);
    } else {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = text;
        img.style.width = '50%';
        img.style.height = 'auto';
        img.style.objectFit = 'contain';
        img.style.marginBottom = '10px';
        button.appendChild(img);
    }

    // Create a text span with rounded, stylish buttons
    const span = document.createElement('span');
    span.innerText = text;
    span.style.padding = '10px 20px';  // Adjust padding for a more substantial button
    span.style.borderRadius = '25px';  // More circular border radius
    span.style.background = 'linear-gradient(135deg, #FF6347, #FFD700, #32CD32)';  // Gradient background
    span.style.color = '#FFFFFF';
    span.style.fontSize = '16px';
    span.style.fontWeight = 'bold';
    span.style.cursor = 'pointer';
    span.style.transition = 'all 0.3s ease-in-out';
    span.style.position = 'absolute';
    span.style.bottom = '10px';  // Position the text button at the bottom of the button container
    span.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';  // Subtle shadow for depth

    // Hover effect for the text button
    span.addEventListener('mouseenter', () => {
        span.style.background = 'linear-gradient(135deg, #FFD700, #FF6347, #32CD32)';  // Swap gradient colors
        span.style.transform = 'scale(1.05)';
    });
    span.addEventListener('mouseleave', () => {
        span.style.background = 'linear-gradient(135deg, #FF6347, #FFD700, #32CD32)';
        span.style.transform = 'scale(1)';
    });

    if (id) button.id = id;
    if (isDisabled) button.style.pointerEvents = 'none';

    button.appendChild(span);
    return button;
}



function toggleFeatures() {
    checkLoginBeforeFeatureAccess(() => {
        // Code for the feature you want to access
        console.log("Feature accessed!");
      });
    const buttonContainer = document.getElementById('feature-buttons');
    buttonContainer.style.transform = buttonContainer.style.transform === 'scale(1)' ? 'scale(0)' : 'scale(1)';
}

function createMainButton() {
    const mainButton = document.createElement('button');
    mainButton.innerText = 'A';
    mainButton.id = 'main_button';
    mainButton.style.width = '40px';
    mainButton.style.height = '40px';
    mainButton.style.borderRadius = '50%';
    mainButton.style.fontSize = '18px';
    mainButton.style.display = 'flex';
    mainButton.style.alignItems = 'center';
    mainButton.style.justifyContent = 'center';
    mainButton.style.backgroundColor = '#007BFF';
    mainButton.style.color = '#FFFFFF';
    mainButton.style.border = 'none';
    mainButton.style.cursor = 'pointer';
    mainButton.style.position = 'fixed';
    mainButton.style.top = '10px';
    mainButton.style.left = '10px';
    mainButton.style.zIndex = 10000;
    mainButton.addEventListener('click', toggleFeatures);
    document.body.appendChild(mainButton);
}

function toggleDetoxSearch(button) {
    const isDetoxOn = button.innerText.includes('OFF');
    button.innerText = isDetoxOn ? 'Detox Search: ON' : 'Detox Search: OFF';
    if (isDetoxOn) {
        blurNegnews();
        hideNegContent();
    } else {
        location.reload();
    }
}

function toggleBlurAdContent(button) {
    const isBlurAdOn = button.innerText.includes('OFF');
    button.innerText = isBlurAdOn ? 'Blur Ads: ON' : 'Blur Ads: OFF';
    if (isBlurAdOn) {
        blockSpamAds();
    } else {
        location.reload();
    }
}

const animationStyle = document.createElement('style');
animationStyle.innerHTML = `
   

    /* Keyframes for rotation */
    @keyframes rotateTilt {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(5deg); }
    }

    /* Keyframes for zoom-pulse */
    @keyframes zoomPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }

    /* Keyframes for glow effect */
    @keyframes glowPulse {
        0%, 100% { text-shadow: 0 0 5px #FFF, 0 0 10px #FFD700, 0 0 20px #32CD32; }
        50% { text-shadow: 0 0 10px #FFF, 0 0 15px #FF6347, 0 0 30px #FFA500; }
    }

    /* Hover animation combination */
    #feature-buttons span:hover {
        animation: 
                   rotateTilt 2s infinite ease-in-out,
                   zoomPulse 1.5s infinite ease-in-out,
                   glowPulse 2s infinite ease-in-out;
        cursor: pointer;
        transform-origin: center;
    }
`;
document.head.appendChild(animationStyle);


function toggleReadContent() {
    if (isReading) {
        stopReading();
    } else {
        readPageContent();
    }
}


function toggleReallocate() {
   // reallocatebut2.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'openreallocate' });
   //   });
}
function  SecurityScan() {
    // reallocatebut2.addEventListener('click', () => {
        toggleFeatures();

        chrome.runtime.sendMessage({ action: 'opensecscan'});
    //   });
 }
function toggleSecurityScan() {
   
    let isReading = false; // To track if content is being read
let stopReadingButton;

function toggleReadContent() {
    if (isReading) {
        stopReading(); // Stop reading content
    } else {
        readPageContent(); // Start reading content
    }
}

function readPageContent() {
    isReading = true;
    // Code to start reading the content on the page
    console.log("Reading content...");
    showStopReadingButton(); // Show the stop button when reading starts
}

function stopReading() {
    isReading = false;
    // Code to stop reading the content on the page
    console.log("Content reading stopped.");
    removeStopReadingButton(); // Remove the stop button when reading stops
}


}

createMainButton();
createButtons();
