window.addEventListener('load', () => {
    createLoginButton();
});
window.addEventListener('load', () => {
  chrome.storage.local.get(['isLoggedIn'], (result) => {
    if (result.isLoggedIn) {
        createMainButton();
        createButtons();
        createSomeButtons();
        injectButton();
        injectLanguageDropdown();
    }
  });
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
function createLoginButton() {
  chrome.storage.local.get(['isLoggedIn'], (result) => {
  if (!result.isLoggedIn) {
  const loginButtonExists = document.getElementById('login-btn');
  if (!loginButtonExists) {
      const loginBtn = document.createElement('button');
      loginBtn.id = 'login-btn';
      loginBtn.innerText = 'Login';
      loginBtn.style.position = 'fixed';
      loginBtn.style.width = '150px'; 
      loginBtn.style.height = '50px';  
      loginBtn.style.top = '40px';  
      loginBtn.style.right = '45px'; 
      loginBtn.style.transform = 'translate(-50%, -50%)';  
      loginBtn.style.zIndex = 1000;
      loginBtn.style.padding = '0';  
      loginBtn.style.backgroundColor = '#4CAF50';
      loginBtn.style.color = '#fff';
      loginBtn.style.border = 'none';
      loginBtn.style.borderRadius = '5px';
      loginBtn.style.cursor = 'pointer';
      loginBtn.style.fontSize = '18px'; 
      loginBtn.style.textAlign = 'center'; 
      loginBtn.style.lineHeight = '50px'; 


      document.body.appendChild(loginBtn);

      // Attach click event
      loginBtn.addEventListener('click', () => {
        checkLoginBeforeFeatureAccess(() => {
          console.log("Feature accessed!");
        });
        loginBtn.style.display = 'none';
        createMainButton();
        createButtons();
        createSomeButtons();
        injectButton();
        injectLanguageDropdown();
      });
    }
  }
  });
}
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
