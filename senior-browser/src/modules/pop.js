document.addEventListener('DOMContentLoaded', function() {
    // Log to see if the DOMContentLoaded event is fired
    console.log('DOMContentLoaded triggered in pop.js');
  
    const urlParams = new URLSearchParams(window.location.search);
    const fileUrl = urlParams.get('url');  // Get the file URL from the query string
  
    if (fileUrl) {
      console.log('File URL found:', fileUrl);
      const downloadButton = document.getElementById('downloadButton');
      downloadButton.addEventListener('click', function() {
        console.log('Download button clicked!');
        try {
          const decodedUrl = decodeURIComponent(fileUrl);  // Decode the URL
          console.log('Decoded URL:', decodedUrl);
  
          // Trigger the download
          chrome.downloads.download({
            url: decodedUrl,
            saveAs: true
          });
  
          // Close the popup after initiating the download
          window.close();
  
        } catch (e) {
          console.error('Error in download process:', e);
        }
      });
    } 
  });
  