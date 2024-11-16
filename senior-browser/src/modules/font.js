function loadFontSettingsModal() {
    const modal = document.createElement('div');
    modal.id = 'fontSettingsModal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.width = '300px';
    modal.style.padding = '20px';
    modal.style.backgroundColor = '#fff';
    modal.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
    modal.style.zIndex = '10000';
    modal.style.borderRadius = '10px';
    modal.style.textAlign = 'center';

    // Font size input and button layout
    modal.innerHTML = `
        <h3>Adjust Font Settings</h3>
        <label>Font Size: </label><input type="number" id="fontSizeInput" value="16" min="8" max="72"><br><br>
        <label>Font Color: </label><input type="color" id="fontColorInput" value="#000000"><br><br>
        <label>Font Style: </label>
        <select id="fontStyleSelect">
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
        </select><br><br>
        <label>Font Weight: </label>
        <select id="fontWeightSelect">
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="bolder">Bolder</option>
            <option value="lighter">Lighter</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
        </select><br><br>
        <div style="display: flex; justify-content: space-between;">
            <button id="applyFontSettings" style="flex: 1; margin-right: 5px;">Apply</button>
            <button id="closeModal" style="flex: 1; background-color: red; color: white;">Close</button>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners for applying and closing modal
    document.getElementById('applyFontSettings').addEventListener('click', () => {
        const fontSize = document.getElementById('fontSizeInput').value;
        const fontColor = document.getElementById('fontColorInput').value;
        const fontStyle = document.getElementById('fontStyleSelect').value;
        const fontWeight = document.getElementById('fontWeightSelect').value;
        applyFontSettings(fontSize, fontColor, fontStyle, fontWeight);
    });

    document.getElementById('closeModal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}


// Inject CSS to reset text styles across the page
function injectGlobalFontStyle(css) {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
}

// Apply the font settings to the entire page
function applyFontSettings(fontSize, fontColor, fontStyle, fontWeight) {
    const elements = document.querySelectorAll('body *');
    elements.forEach(element => {
        element.style.fontSize = fontSize + 'px';
        element.style.color = fontColor;
        element.style.fontStyle = fontStyle === 'italic' ? 'italic' : 'normal';
        element.style.fontWeight = fontWeight; // Apply the selected font weight
    });
    
}