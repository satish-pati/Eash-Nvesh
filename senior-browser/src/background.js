//import { MongoClient } from 'mongodb'; 
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isLoggedIn: false });
  console.log('insatlled');
});//just wrote for debugging 
chrome.runtime.onMessage.addListener((request, sender) => {
if (request.url) {
  chrome.downloads.download({
    url: request.url,
    saveAs: true
  }, (downloadId) => {
    if (chrome.runtime.lastError) {
      console.error("Download failed:", chrome.runtime.lastError.message);
    } else {
      console.log("Download started with ID:", downloadId);
    }
  });
}
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
      chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['src/content.js']
      }).catch(error => {
        console.log('error');
      });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openreallocate') {
    console.log("start");
    chrome.windows.create({
      url: chrome.runtime.getURL('src/modules/reallocate.html'), 
      type: 'popup',
      width: 400,
      height: 350
    });
  }
if (request.action === 'opensecscan') {
  console.log("start");
  // Query the current active tab to get its URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab && currentTab.url) {
          // Encode the URL and pass it as a query parameter
          const pageUrl = encodeURIComponent(currentTab.url);
          chrome.windows.create({
              url: chrome.runtime.getURL(`src/modules/sec.html?url=${pageUrl}`),
              type: 'popup',
              width: 380,
              height: 365
          });
      } else {
          console.error("No active tab found or URL not available.");
      }
  });
}

  if (request.action === 'readContent') {
    chrome.tts.speak(request.text, { rate: 1.0, pitch: 1.0, volume: 1.0 });
  }
  if (message.type === "searchVideos") {
    db.collection('videos').find({}).toArray((err, videos) => {
        if (err) {
            console.error(err);
            sendResponse({ videos: [] });
            return;
        }
        const filteredVideos = videos.filter(video => 
            video.title.toLowerCase().includes(message.query.toLowerCase())
        );
        sendResponse({ videos: filteredVideos });
    });
}
  
});
/*
const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://Satish:Satya%4023@cluster0.8zasz.mongodb.net/videoLibrary?retryWrites=true&w=majority'
const dbName = 'videoDB';
let db;
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
      console.log("Connected to MongoDB");
      db = client.db(dbName);
  })
  .catch(err => console.error(err));


chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
      id: "reallocateFile",
      title: "Reallocate an Rename File",
      contexts: ["all"]
  });
});
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "renamefilesext") {
    const fileId = info.targetElementId || null; 
    chrome.windows.create({
      url: chrome.runtime.getURL("/popup1/popup.html?fileId=" + fileId), 
      type: "popup",
      width: 600,
      height: 300
    });
  }
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "reallocateFile") {
        chrome.tabs.create({ url: chrome.runtime.getURL("src/pop.html") });
    }
  });

*/
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
  });
  
