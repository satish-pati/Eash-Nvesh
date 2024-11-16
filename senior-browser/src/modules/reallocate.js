const fileInput = document.getElementById('fileselect');
const fileNameDisplay = document.getElementById('file-name');
fileInput.addEventListener('change', function() {
    const file = fileInput.files[0];
    if (file) {
        fileNameDisplay.textContent = `Selected file: ${file.name}`;
    } else {
        fileNameDisplay.textContent = '';
    }
});
document.getElementById('loca').addEventListener('click', () => {
    const filex = document.getElementById('fileselect');
    const file = filex.files[0];

    if (file) {
        const url = URL.createObjectURL(file);
        chrome.downloads.download({
            url: url,
            filename: file.name,
            saveAs: true
        });
        URL.revokeObjectURL(url);
        window.close();
    } else {
        alert("Please select a file to download.");
    }
}); 