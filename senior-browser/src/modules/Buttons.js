let zoomFactor = 1.0;
let contrastValue = 1.0;
let mediaRecorder;
let recordedChunks = [];
let select = false;
let all=false;
function changeBackgroundColor(color) {
    document.documentElement.style.setProperty('--bg-color', color);
    const style = document.createElement('style');
    style.innerHTML = `
        body {
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

function createSomeButtons() {
    const buttonContainers = document.createElement('div');
    buttonContainers.id = 'some-feature-buttons';
    buttonContainers.style.position = 'fixed';
    buttonContainers.style.top = '0';
    buttonContainers.style.left = '0'; 
    buttonContainers.style.width = '350px'; 
    buttonContainers.style.height = '350px';
    buttonContainers.style.zIndex = 9999;
    buttonContainers.style.backgroundColor = 'rgba(0,0,0, 0.8)';
    buttonContainers.style.borderBottomRightRadius = '300px';
    buttonContainers.style.transformOrigin = 'top left';
    buttonContainers.style.transition = 'transform 0.3s ease-in-out';
    buttonContainers.style.transform = 'scale(0)'; 
    buttonContainers.style.display = 'grid';
    buttonContainers.style.gridTemplateColumns = 'repeat(2, 1fr)'; 
    buttonContainers.style.gridGap = '20px'; 
    buttonContainers.style.padding = '20px';
    buttonContainers.style.color = 'white';

    const zoomInButton = createButtonWithImage('Zoom In', null);
    const zoomOutButton = createButtonWithImage('Zoom Out', null);
    const showAllButton = createButtonWithImage('Show all', null);
    zoomInButton.addEventListener('click', () => zoomPage(0.1));
    zoomOutButton.addEventListener('click', () => zoomPage(-0.1));
    showAllButton.addEventListener('click', () => {
        allFeatures();
    });
    buttonContainers.appendChild(zoomInButton);
    buttonContainers.appendChild(zoomOutButton);
    buttonContainers.appendChild(showAllButton);
    document.body.appendChild(buttonContainers);
}

function createButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'feature-buttons';
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.top = '0';
    buttonContainer.style.left = '0';
    buttonContainer.style.width = '90vw';  
    buttonContainer.style.height = '60vh'; 
    buttonContainer.style.zIndex = 9999;
    buttonContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    buttonContainer.style.borderBottomRightRadius = '10px';
    buttonContainer.style.padding = '20px';
    buttonContainer.style.display = 'grid';
    buttonContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';  
    buttonContainer.style.rowGap = '0px';  
    buttonContainer.style.columnGap = '25px';  
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
    const detoxSearchButton = createButtonWithImage('Detox Search: ON');
    const readContentButton = createButtonWithImage('Read Content Aloud');
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
logoutButton.style.bottom = "20px"; 
logoutButton.style.left = "20px";
logoutButton.style.zIndex = 1000;
// Styling the button
logoutButton.style.padding = "10px 20px";
logoutButton.style.backgroundColor = "#f44336"; 
logoutButton.style.color = "white"; 
logoutButton.style.border = "none"; 
logoutButton.style.borderRadius = "5px"; 
logoutButton.style.cursor = "pointer";
logoutButton.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";
const videoButton = createButtonWithImage('Video Tutorials', 'video_tutorial_button');
videoButton.addEventListener('click', async function () {
    try {
        const response = await fetch('https://render-nl4l.onrender.com/videos');
        const videos = await response.json();

        if (videos && videos.length > 0) {
            if (!window.location.href.includes('google.com')) {
                showVideoModal(videos);
            } else {
               showVideoModal(videos);
            }
        } else {
            alert('No videos found.');
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
        chrome.runtime.sendMessage({ action: "openVideoPage" });
        console.error("Message error:", chrome.runtime.lastError.message);
    }
});

videoButton.addEventListener('click', toggleFeatures);

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
    button.style.height = '150px';
    button.style.width = '100%';  
    button.style.position = 'relative';


    if (id === 'start_video') {
        imageSrc = 'https://play-lh.googleusercontent.com/DISX7-mPtxpAjv-sRiCDkzQ0I1zRD3pp8EQ__ckPWCTTwGr2EUjTE6yng6lQnlmjmszp';
    } else if (text === 'Zoom In') {
        imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGMD5V96BFDblxP7xMf2ZY_xC2x1gpjzoSLQ&s';
    } else if (text === 'Zoom Out') {
        imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzFevrvcCfBDKzkw5xoP_JM-WImqPz8qWVHg&s';
    } else if (text === 'Detox Search: ON') { 
        imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2VuFC4jBUGmXe0o4pbwhYNggtN4DyOJY_iA&s';
    } else if (text === 'Read Content Aloud') { 
        imageSrc = 'https://cdn-icons-png.flaticon.com/512/9289/9289709.png';
    } else if (text === 'Adjust Font Settings') {  
        imageSrc = 'https://cdn-icons-png.freepik.com/512/8144/8144468.png';
    } else if (text === 'Download File') {  
        imageSrc = 'https://www.citypng.com/public/uploads/preview/download-file-document-blue-outline-icon-png-img-701751694962530gugetptdob.png';
    } else if (text === 'Video Tutorials') {  
        imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMiZjld3TWP8VEsC605QCl7z5BxfAeBbNhvw&s';
    } else if (text === 'Blur Ads: OFF') { 
        imageSrc = 'https://img.freepik.com/premium-vector/ad-blocker-icon-vector-image-can-be-used-digital-marketing_120816-168337.jpg';
    } else if (text === 'Reallocate File') {  
        imageSrc = 'https://cdn-icons-png.flaticon.com/128/2521/2521940.png';
    } else if (text === 'Scan Web') {  
        imageSrc = 'https://cdn-icons-png.flaticon.com/512/7800/7800278.png';
    }
    else if (text === 'Show all') {  
        imageSrc = 'https://cdn-icons-png.flaticon.com/512/6711/6711397.png';
    }
    else if (text === 'Increase Contrast') {  
        imageSrc = 'https://cdn-icons-png.freepik.com/512/25/25636.png';
    }
    else if (text === 'Decrease Contrast') {  
        imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaVWPFreElWI1l8TGaWo6EHVYBvv04qGwmnA&s';
        }
   
    if (isInput) {
        const input = document.createElement('input');
        input.type = 'color';
        input.style.width = '50%';
        input.style.height = '50%';
        input.style.marginBottom = '10px';
        button.appendChild(input);
    } else {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = text;
        img.style.width = '50%';
        if (text === 'Detox Search: ON')
        {
            img.style.height = '50%';
            img.style.objectFit = 'cover';
        }
        else{
            img.style.height = 'auto';
            img.style.objectFit = 'contain';
        }
        img.style.marginBottom = '10px';
        button.appendChild(img);
    }

    const span = document.createElement('span');
    span.innerText = text;
    span.style.padding = '10px 20px';  
    span.style.borderRadius = '25px'; 
    span.style.background = '#007BFF';  
    span.style.color = '#FFFFFF';
    span.style.fontSize = '16px';
    span.style.fontWeight = 'bold';
    span.style.cursor = 'pointer';
    span.style.transition = 'all 0.3s ease-in-out';
    span.style.position = 'absolute';
    span.style.bottom = '10px';  
    span.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)'; 

    
    span.addEventListener('mouseenter', () => {
        span.style.background ='#0056b3'; 
        span.style.transform = 'scale(1.15)';
    });
    span.addEventListener('mouseleave', () => {
        span.style.background = '#007BFF';
        span.style.transform = 'scale(1)';
    });

    if (id) button.id = id;
    if (isDisabled) button.style.pointerEvents = 'none';

    button.appendChild(span);
    return button;
}




function toggleFeatures() {
      const buttonContainer = document.getElementById('some-feature-buttons');
      const buttonContainera = document.getElementById('feature-buttons');
      if (all) {
          buttonContainera.style.transform = 'scale(0)';
          all = false;
      } else {
          buttonContainer.style.transform = buttonContainer.style.transform === 'scale(1)' ? 'scale(0)' : 'scale(1)';
      }
}

function allFeatures() {
    const buttonContainer = document.getElementById('some-feature-buttons');
    buttonContainer.style.transform = buttonContainer.style.transform === 'scale(1)' ? 'scale(0)' : 'scale(1)';
    const buttonContainera = document.getElementById('feature-buttons');
    buttonContainera.style.transform = buttonContainer.style.transform === 'scale(1)' ? 'scale(0)' : 'scale(1)';
    all=!all;
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
    const isDetoxOFF = button.innerText.includes('ON');
    button.innerText = isDetoxOFF ? 'Detox Search: OFF' : 'Detox Search: ON';
    if (isDetoxOFF) {
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
   
    @keyframes zoomPulse {
        0% { transform: scale(2); }
    }

    #feature-buttons span:hover {
        animation:  zoomPulse 1.5s infinite ease-in-out,
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
    console.log("Reading content...");
    showStopReadingButton(); 
}

function stopReading() {
    isReading = false;
    console.log("Content reading stopped.");
    removeStopReadingButton(); 
}
}
 

