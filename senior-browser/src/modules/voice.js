let recognition;
let isListening = false;

function startVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.error("Speech recognition isn't supported by this browser.");
        return;
    }
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    // Set the language initially and add a listener for dynamic language changes
    const languageSelect = document.getElementById("languageSelect");
    recognition.lang = languageSelect.value;

    // Change recognition language dynamically whenever the dropdown changes
    languageSelect.addEventListener("change", () => {
        recognition.lang = languageSelect.value;
        toggleButtonIcon(false);
        stopVoiceRecognition();
        isListening = false;
        console.log("Language changed to:", recognition.lang);
    });

    recognition.onstart = () => {
        console.log("Voice recognition has started.");
        toggleButtonIcon(true);
    };
    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        console.log('Recognized:', transcript);
        handleVoiceCommand(transcript, recognition.lang);
    };
    recognition.onerror = (event) => {
        console.error("Recognition error:", event.error);
        stopVoiceRecognition();
    };
    recognition.onend = () => {
        console.log("Voice recognition has ended.");
        toggleButtonIcon(false);
    };
    recognition.start();
}

function stopVoiceRecognition() {
    if (recognition) {
        recognition.stop();
        console.log("Voice recognition is stopped by the user.");
        toggleButtonIcon(false);
    }
}

function handleVoiceCommand(command, language) {
    let responseText = "";

    if (language === 'te-IN') {
        if (command.includes('కిందకి వేళ్ళు') || command.includes('పేజీ కిందకి')|| command.includes('కిందకెళ్ళు')) {
            window.scrollBy(0, 500);
            responseText="పేజీని క్రిందికి స్క్రోల్ చేసాను";
        } else if (command.includes('పైకి వేళ్ళు') || command.includes('పేజీ పైకి')|| command.includes('పైకెళ్ళు'))  {
            window.scrollBy(0, -500);
            responseText="పేజీని పైకి స్క్రోల్ చేసాను";
        } else if (command.includes('వెనక్కి వెళ్ళు')|| command.includes('వెనక్కెళ్ళు')) {
            window.history.back();
            responseText="వెనక్కి వెళ్ళాను";
        } else if (command.includes('ముందుకు వెళ్ళు') || command.includes('ముందుకెళ్ళు')) {
            window.history.forward();
            responseText="ముందుకు వెళ్ళాను";
        } else if (command.includes('చివరకి వెళ్ళు') || command.includes('చివరికెళ్ళు')) {
            window.scrollTo(0, document.body.scrollHeight);
            responseText="చివరి వరకు స్క్రోల్ చేసాను";
        } else if (command.includes('మొదటకి వెళ్ళు')||command.includes('మొదటికెళ్ళు') ) {
            window.scrollTo(0, 0);
            responseText="పేజీ మొదటి వరకు స్క్రోల్ చేసాను";
        } else if (command.includes('వినడం ఆపివేయి') || command.includes('వినడం ఆపు') || command.includes('వినడం ఆపెయి') ) {
            stopVoiceRecognition();
            responseText="వినడం మానేశాను";
            isListening = false;
        } else if (command.includes('కొత్త టాబ్ తెరువు') || command.includes('కొత్త ట్యాబ్ తెరువు') || command.includes('కొత్త టాప్ తెరువు')) {
            window.open('https://www.google.com/', '_blank');
            responseText="కొత్త ట్యాబ్‌ని తెరిచాను";
        } else if (command.includes('యూట్యూబ్ తెరవండి') ||command.includes('యూట్యూబ్ తెరువు') ) {
            window.open('https://www.youtube.com/');
            responseText="యూట్యూబ్ ఓపెన్ చేసాను";
        } else if (command.includes('ఫేస్‌బుక్ తెరవండి')||command.includes('ఫేస్‌బుక్ తెరువు')) {
            window.open('https://www.facebook.com/');
            responseText="ఫేస్ బుక్ ఓపెన్ చేసాను";
        } else {
            console.log("Unrecognized Telugu command:", command);
        }
    } else if (language === 'hi-IN') {
        if (command.includes('नीचे स्क्रॉल करो') || command.includes('नीचे जाओ')) {
            window.scrollBy(0, 500);
            responseText="पेज को नीचे स्क्रॉल किया";
        } else if (command.includes('ऊपर स्क्रॉल करो') || command.includes('ऊपर जाओ')) {
            window.scrollBy(0, -500);
            responseText="पेज को ऊपर स्क्रॉल किया";
        } else if (command.includes('पीछे जाओ')) {
            window.history.back();
            responseText="वापस चला गया";
        } else if (command.includes('आगे जाओ')) {
            window.history.forward();
            responseText="आगे बढ़ गया";
        } else if (command.includes('अंत में स्क्रॉल करो')) {
            window.scrollTo(0, document.body.scrollHeight);
            responseText="पृष्ठ को समाप्त करने के लिए स्क्रॉल किया";
        } else if (command.includes('शुरुआत में स्क्रॉल करो')) {
            window.scrollTo(0, 0);
            responseText="पृष्ठ को शीर्ष तक स्क्रॉल किया";
        } else if (command.includes('सुनना बंद करो')) {
            stopVoiceRecognition();
            responseText="सुनना बंद कर दिया";
            isListening = false;
        } else if (command.includes('नया तब')) {
            window.open('https://www.google.com/', '_blank');
            responseText="नया टैब खुला";
        } else if (command.includes('यूट्यूब खोलो')) {
            window.open('https://www.youtube.com/');
            responseText="यूट्यूब खुल गया है";
        } else if (command.includes('फेसबुक खोलो')) {
            window.open('https://www.facebook.com/');
            responseText="फेसबुक खुल गया";
        } else {
            console.log("Unrecognized Hindi command:", command);
        }
    } else {
        if (command.includes('scroll down')) {
            window.scrollBy(0, 500);
            responseText="Scrolled the page down";
        } else if (command.includes('scroll up')) {
            window.scrollBy(0, -500);
            responseText="Scrolled the page up";
        } else if (command.includes('go back')) {
            window.history.back();
            responseText="Went Back";
        } else if (command.includes('go forward')) {
            window.history.forward();
            responseText="Went Forward";
        } else if (command.includes('scroll to end')) {
            window.scrollTo(0, document.body.scrollHeight);
            responseText="Scrolled the page to end";
        } else if (command.includes('scroll to top')) {
            window.scrollTo(0, 0);
            responseText="Scrolled the page to top";
        } else if (command.includes('stop listening')) {
            stopVoiceRecognition();
            responseText="Stopped Listening";
            isListening = false;
        } else if (command.includes('new tab')) {
            window.open('https://www.google.com/', '_blank');
            responseText="New tab opened";
        } else if (command.includes('open youtube')) {
            window.open('https://www.youtube.com/');
            responseText="Youtube is opened";
        } else if (command.includes('open facebook')) {
            window.open('https://www.facebook.com/');
            responseText="Facebook is opened";
        } else {
            console.log("Unrecognized English command:", command);
        }
    }

    if (responseText) {
        speak(responseText);
    } else {
        console.log("Unrecognized command in selected language:", command);
    }
}
function speak(text) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    // Configure language-specific settings
    if (recognition.lang === 'te-IN') {
        utterance.lang = 'te-IN';
        utterance.rate = 0.75;  // Slightly slower for better clarity in Telugu
        utterance.pitch = 1.2; // Slightly higher pitch for clarity
        utterance.volume = 1;

    } else if (recognition.lang === 'hi-IN') {
        utterance.lang = 'hi-IN';
        utterance.rate = 0.9;   // Slightly slower for clarity in Hindi
        utterance.pitch = 1;
        utterance.volume = 1;

    } else if (recognition.lang === 'en-US') {
        utterance.lang = 'en-US';
        utterance.rate = 1;     // Standard rate for English
        utterance.pitch = 1;
        utterance.volume = 1;
    }

    // Set the appropriate voice based on the selected language
    const setVoice = () => {
        const voices = speechSynthesis.getVoices();
        let selectedVoice;

        if (recognition.lang === 'te-IN') {
            selectedVoice = voices.find(voice => voice.lang === 'te-IN');
        } else if (recognition.lang === 'hi-IN') {
            selectedVoice = voices.find(voice => voice.lang === 'hi-IN');
        } else if (recognition.lang === 'en-US') {
            selectedVoice = voices.find(voice => voice.lang === 'en-US');
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        speechSynthesis.speak(utterance);
    };

    // Check if voices are already loaded
    if (speechSynthesis.getVoices().length) {
        setVoice();
    } else {
        // If voices are not yet loaded, use onvoiceschanged event
        speechSynthesis.onvoiceschanged = setVoice;
    }
}

function injectButton() {
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggleVoiceButton";
    toggleButton.style.position = "fixed";
    toggleButton.style.bottom = "50px";
    toggleButton.style.right = "50px";
    toggleButton.style.zIndex = 10000;
    toggleButton.style.width = "60px";
    toggleButton.style.height = "60px";
    toggleButton.style.backgroundColor = "#4285F4";
    toggleButton.style.color = "white";
    toggleButton.style.border = "none";
    toggleButton.style.borderRadius = "50%";
    toggleButton.style.display = "flex";
    toggleButton.style.alignItems = "center";
    toggleButton.style.justifyContent = "center";
    toggleButton.style.cursor = "pointer";
    toggleButton.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";

    // Initial microphone icon (not listening)
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H6c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>`;

    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", () => {
        if (!isListening) {
            startVoiceRecognition();
            toggleButtonIcon(true);
            isListening = true;
        } else {
            stopVoiceRecognition();
            toggleButtonIcon(false);
            isListening = false;
        }
    });
}

function toggleButtonIcon(listening) {
    const toggleButton = document.getElementById("toggleVoiceButton");

    if (listening) {
        toggleButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3zm6-3c0 3.07-2.13 5.64-5 5.93V21h-2v-4.07c-1.64-.14-3.15-.77-4.25-1.75l1.46-1.46c.79.63 1.77 1.03 2.79 1.03 2.49 0 4.5-2.01 4.5-4.5V7.1l2-2V11zm.5-4.62L4.5 20.37l1.49 1.49 15-15-1.49-1.49-15 15 1.49 1.49L19.5 6.38z"/>
            </svg>`;
        toggleButton.style.backgroundColor = "#D32F2F";  // Red color when listening
    } else {
        toggleButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                <path d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3s-3 1.34-3 3v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H6c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>`;
        toggleButton.style.backgroundColor = "#4285F4";  // Blue color when not listening
    }
}

// Create language selection dropdown
function injectLanguageDropdown() {
    const languageSelect = document.createElement("select");
    languageSelect.id = "languageSelect";
    languageSelect.style.position = "fixed";
    languageSelect.style.bottom = "120px";
    languageSelect.style.right = "50px";
    languageSelect.style.zIndex = 10000;
    languageSelect.style.padding = "10px";
    languageSelect.style.width = "110px";
    languageSelect.style.height = "40px";
    languageSelect.style.backgroundColor = "#f0f0f0";
    languageSelect.style.color = "black";
    languageSelect.style.border = "1px solid #ccc";
    languageSelect.style.borderRadius = "5px";
    languageSelect.style.cursor = "pointer";

    const englishOption = document.createElement("option");
    englishOption.value = "en-US";
    englishOption.textContent = "English";
    languageSelect.appendChild(englishOption);

    const teluguOption = document.createElement("option");
    teluguOption.value = "te-IN";
    teluguOption.textContent = "Telugu";
    languageSelect.appendChild(teluguOption);

    const hindiOption = document.createElement("option");
    hindiOption.value = "hi-IN";
    hindiOption.textContent = "Hindi";
    languageSelect.appendChild(hindiOption);

    document.body.appendChild(languageSelect);
}

// Inject UI elements on page load
window.onload = () => {
    injectButton();
    injectLanguageDropdown();
};
