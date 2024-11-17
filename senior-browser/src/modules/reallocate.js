document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileselect');
    const fileNameDisplay = document.getElementById('file-name');
    const downloadButton = document.getElementById('loca');

    if (!fileInput || !fileNameDisplay || !downloadButton) {
        console.error('Required DOM elements are missing. Check your HTML for IDs: fileselect, file-name, loca.');
        return; // Stop further execution if elements are missing
    }

    // File selection logic
    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        if (file) {
            fileNameDisplay.textContent = `Selected file: ${file.name}`;
        } else {
            fileNameDisplay.textContent = '';
        }
    });

    // Download button logic
    downloadButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            chrome.downloads.download(
                {
                    url: url,
                    filename: file.name,
                    saveAs: true,
                },
                (downloadId) => {
                    if (chrome.runtime.lastError) {
                        console.error(`Error downloading file: ${chrome.runtime.lastError.message}`);
                    } else {
                        console.log(`Download started: ID ${downloadId}`);
                    }
                }
            );
            URL.revokeObjectURL(url); // Release object URL
        } else {
            alert('Please select a file to download.');
        }
    });
});
