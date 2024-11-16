//To change the button color and text on clicking
/*injectButton();
//  detox search is only applied when the toggle is ON
window.addEventListener('load', () => {
    if (isDetoxSearchOn) {
        blurNegnews();
        hideNegContent();
    }
});
window.addEventListener('load', () => {
    document.body.appendChild(button);
});*/



/*
// Inject the button for font settings
const button2 = document.createElement('button');
button2.id = 'fontSettingsBtn';
button2.innerText = 'Adjust Font Settings';
button2.style.position = 'fixed';
button2.style.top = '140px';
button2.style.right = '20px';
button2.style.padding = '10px 20px';
button2.style.fontSize = '16px';
button2.style.zIndex = '9999';
button2.style.backgroundColor = '#007bff';
button2.style.color = '#fff';
button2.style.border = 'none';
button2.style.borderRadius = '5px';
button2.style.cursor = 'pointer';
document.body.appendChild(button2);
// Load the font settings modal when the button is clicked
button2.addEventListener('click', () => {
    loadFontSettingsModal();
});*//**/
window.addEventListener('load', () => {
    injectFeatureButtons();
    //injectLogoutButton()
});
window.addEventListener('load', () => {
  createMainButton();
  createButtons(); 
});
/*
  // content.js
chrome.storage.local.get(['isLoggedIn'], (result) => {
  if (!result.isLoggedIn) {
     // window.location.href = chrome.runtime.getURL("public/login.html");
  } else {
      injectLogoutButton();
  }
  

});*/
function checkLoginBeforeFeatureAccess(featureCallback) {
  chrome.storage.local.get(['isLoggedIn'], (result) => {
    if (result.isLoggedIn) {
      featureCallback();
    } else {
      // Redirect to login page
      window.location.href = chrome.runtime.getURL("public/login.html");
    }
  });
}


(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentVideoBookmarks = [];
  const fetchBookmarks = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get([currentVideo], (obj) => {
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
      });
    });
  };
  const addNewBookmarkEventHandler = async () => {
    const currentTime = youtubePlayer.currentTime;
    const newBookmark = {
      time: currentTime,
      desc: "Bookmark at " + getTime(currentTime),
    };
    currentVideoBookmarks = await fetchBookmarks();
    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
    });
  };
  const newVideoLoaded = async () => {
    const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
    currentVideoBookmarks = await fetchBookmarks();
    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");
      bookmarkBtn.src = chrome.runtime.getURL("src/assets/bookmark.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.title = "Click to bookmark current timestamp";

      youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName('video-stream')[0];

      if (youtubeLeftControls) {
        youtubeLeftControls.appendChild(bookmarkBtn);
      } else {
        console.log(" not found.");
      }
      
      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    }
  };
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;
    if (type === "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    } else if (type === "PLAY") {
      youtubePlayer.currentTime = value;
    } else if ( type === "DELETE") {
      currentVideoBookmarks = currentVideoBookmarks.filter((b) => b.time != value);
      chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentVideoBookmarks) });

      response(currentVideoBookmarks);
    }
  });
  newVideoLoaded();
})();

const getTime = t => {
  var date = new Date(0);
  date.setSeconds(t);

  return date.toISOString().substr(11, 8);
};

function handleLogout() {
  chrome.storage.local.set({ isLoggedIn: false }, () => {
      window.location.href = chrome.runtime.getURL("public/login.html");
  });
}