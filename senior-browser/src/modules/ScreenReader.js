/*let isReading = false; // variable to track reading state
let currentSection = null; // variable to track the section being read


// Function to read the page content
function readPageContent() {
    const topStoriesSection = document.querySelectorAll(' article, h3, h4, h5, h6, .xrnccd, .VDXfz, .ZINbbc, .iHxmLe, .KYaZsb');
    let bodyText = '';

    topStoriesSection.forEach(section => {
        const hasNegativeWord = Words.some(word => {
            const regx = new RegExp(`\\b${word}\\b`, 'gi');

            return regx.test(section.innerText);
        });

        if (!section.style.filter.includes('blur') && !hasNegativeWord) {
            bodyText += section.innerText + ' ';
        }
    });

    if (bodyText.trim()) {
        const utterance = new SpeechSynthesisUtterance(bodyText);
        window.speechSynthesis.speak(utterance);
        isReading = true;
        button.textContent = 'Stop Reading';

        // When speech ends
        utterance.onend = () => {
            stopReading();
        };
    } else {
        alert("No content found to read that isn't blurred or negative.");
    }
}

function stopReading() {
    window.speechSynthesis.cancel(); 
    isReading = false; // Update state
    button.textContent = 'Read Content'; // Reset button text
}

// Button setup
const button = document.createElement('button');
button.textContent = 'Read Content';
button.style.position = 'fixed';
button.style.top = '60px';
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
*/
let isReading = false; // variable to track reading state
let currentSection = null; // variable to track the section being read
// Function to read the page content
function readPageContent() {
    showStopReadingButton();
    const topStoriesSection = document.querySelectorAll('.N54PNb BToiNc,.kb0PBd cvP2Ce A9Y9g,.VwiC3b yXK7lf lVm3ye r025kc hJNv6b Hdw6tb,.kb0PBd A9Y9g,.N54PNb BToiNc cvP2Ce,n0jPhd ynAwRc tNxQIb nDgy9d,.n0jPhd ynAwRc tNxQIb nDgy9d,.SoAPf,.lSfe4c O5OgBe M9rH0b dWgpFe,.xrnccd, .VDXfz, .ZINbbc, .iHxmLe, .KYaZsb,.N54PNb,.N54PNb,article, h3, h4, h5, h6, .xrnccd, .VDXfz, .ZINbbc');
    let bodyText = '';
    let sectionsToRead = []; // to store sections without negative words
    topStoriesSection.forEach(section => {
        const hasNegativeWord = Words.some(word => {
            const regx = new RegExp(`\\b${word}\\b`, 'gi');
            return regx.test(section.innerText);
        });

        if (!section.style.filter.includes('blur') && !hasNegativeWord) {
            bodyText += section.innerText + ' ';
            sectionsToRead.push(section); // store sections that will be read
        }
    });

    if (bodyText.trim()) {
        let currentIndex = 0;

        function speakNextSection() {
            if (currentIndex >= sectionsToRead.length) {
                stopReading(); // Stop when all sections are read
                return;
            }

            // Get the current section
            currentSection = sectionsToRead[currentIndex];
            const utterance = new SpeechSynthesisUtterance(currentSection.innerText);
            // Highlight the current section
            highlightCurrentSection(currentSection);
            // Show current reading text on screen
            displayCurrentText(currentSection.innerText);
            // Start reading
            window.speechSynthesis.speak(utterance);
            isReading = true;
           // button.textContent = 'Stop Reading';
            // When speech ends, move to the next section
            utterance.onend = () => {
                currentIndex++;
                speakNextSection(); // Recursively speak the next section
            };
        }
        // Start reading the first section
        speakNextSection();
    } else {
        alert("No content found to read that ");
    }
}
// Function to highlight the current section
function highlightCurrentSection(section) {
    // Remove highlight from the previous section
    if (currentSection) {
        currentSection.style.backgroundColor = '';
    }

    // Highlight the current section
    section.style.backgroundColor = 'yellow'; // Apply a yellow highlight
}

// Function to display the current reading text
function displayCurrentText(text) {
    let readingBox = document.getElementById('readingBox');
    
    if (!readingBox) {
        // Create a reading box if it doesn't exist
        readingBox = document.createElement('div');
        readingBox.id = 'readingBox';
        readingBox.style.position = 'fixed';
        readingBox.style.bottom = '20px';
        readingBox.style.left = '50%';
        readingBox.style.transform = 'translateX(-50%)';
        readingBox.style.backgroundColor = '#333';
        readingBox.style.color = 'white';
        readingBox.style.padding = '10px';
        readingBox.style.borderRadius = '5px';
        readingBox.style.fontSize = '16px';
        readingBox.style.zIndex = '9999';
        readingBox.style.maxWidth = '80%';
        readingBox.style.textAlign = 'center';
        document.body.appendChild(readingBox);
    }

    readingBox.textContent = text; // Update the text inside the box
}

// Function to stop reading
function stopReading() {
    window.speechSynthesis.cancel();
    isReading = false; // Update state
    //button.textContent = 'Read Content'; // Reset button text

    // Remove the highlight from the last section
    if (currentSection) {
        currentSection.style.backgroundColor = '';
        currentSection = null;
    }
    removeStopReadingButton();

    // Remove the reading text display
    const readingBox = document.getElementById('readingBox');
    if (readingBox) {
        document.body.removeChild(readingBox);
    }
}
/*

// Button setup
const button = document.createElement('button');
button.textContent = 'Read Content';
button.style.position = 'fixed';
button.style.top = '60px';
button.style.right = '10px';
button.style.zIndex = '9999';
button.style.backgroundColor = '#4CAF50';
button.style.color = 'white';
button.style.border = 'none';
button.style.padding = '10px';
button.style.cursor = 'pointer';
button.style.borderRadius = '5px';
button.style.fontSize = '14px';
//document.body.appendChild(button);
featureContainer.appendChild(button);

button.addEventListener('click', () => {
    if (isReading) {
        stopReading();
    } else {
        readPageContent();
    }
});*/
   

function showStopReadingButton() {
   
    stopReadingButton = document.createElement('button');
    stopReadingButton.innerText = "Stop Reading";
    stopReadingButton.style.position = 'fixed';
    stopReadingButton.style.top = '10px';
    stopReadingButton.style.left = '10px';
    stopReadingButton.style.zIndex = 10000;
    stopReadingButton.style.padding = '10px 20px';
    stopReadingButton.style.fontSize = '16px';
    stopReadingButton.style.backgroundColor = '#FF6347';
    stopReadingButton.style.color = '#FFF';
    stopReadingButton.style.border = 'none';
    stopReadingButton.style.borderRadius = '5px';
    stopReadingButton.style.cursor = 'pointer';
    stopReadingButton.addEventListener('click', stopReading);
    document.body.appendChild(stopReadingButton);

}

function removeStopReadingButton() {
if (stopReadingButton) {
    stopReadingButton.remove(); // Remove the stop button
    stopReadingButton = null;
}
}
