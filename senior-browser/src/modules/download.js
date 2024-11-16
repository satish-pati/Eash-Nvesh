function highlightitem(enable) {
  const links = document.querySelectorAll('a, img, video');
  links.forEach(link => {
    if (enable) {
      link.style.outline = '2px solid #ff0000';
      link.style.cursor = 'pointer';
      link.addEventListener('click', handleFileClick);
    } else {
      link.style.outline = '';
      link.style.cursor = '';
      link.removeEventListener('click', handleFileClick);
    }
  });
}

function handleFileClick(event) {
  event.preventDefault(); 
  const target = event.target.closest('a, img, video');
  const furl = target.href || target.src;
  if (furl != null) {
    console.log("Download started with ID:");

    chrome.runtime.sendMessage({ url: furl });

  }
  select = false;
  dbutton.innerText = 'Download File';
}
