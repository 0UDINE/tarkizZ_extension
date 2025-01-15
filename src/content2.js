// Add CSS for hiding elements
const style = document.createElement('style');
style.textContent = `
  .hidden {
    display: none !important;
  }
`;
document.head.appendChild(style);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggle') {
      try {
        const isHidden = document.querySelector('#secondary')?.classList.contains('hidden');
        if (isHidden) {
          showAllElements();
        } else {
          hideAllElements();
        }
        chrome.storage.local.set({ isFocusMode: !isHidden });
        sendResponse({ success: true });
      } catch (error) {
        console.error("Toggle error:", error);
        sendResponse({ success: false, error: error.message });
      }
    }
    return true;
});

// Individual hide functions for each element
function hideThumbnails() {
  const thumbnailsSection = document.querySelector("#secondary");
  if (thumbnailsSection) {
    thumbnailsSection.classList.add('hidden');
  } else {
    console.warn("Thumbnails section not found");
  }
}

function hideComments() {
  const commentSection = document.querySelector("#comments");
  if (commentSection) {
    commentSection.classList.add('hidden');
  } else {
    console.warn("Comments section not found");
  }
}

function hideVideoDescription() {
  const videoDescription = document.querySelector('#below');
  if (videoDescription) {
    videoDescription.classList.add('hidden');
  } else {
    console.warn("Video description not found");
  }
}

// Individual show functions for each element
function showThumbnails() {
  const thumbnailsSection = document.querySelector("#secondary");
  if (thumbnailsSection) {
    thumbnailsSection.classList.remove('hidden');
  }
}

function showComments() {
  const commentSection = document.querySelector("#comments");
  if (commentSection) {
    commentSection.classList.remove('hidden');
  }
}

function showVideoDescription() {
  const videoDescription = document.querySelector('#below');
  if (videoDescription) {
    videoDescription.classList.remove('hidden');
  }
}

// Combined functions to hide/show all elements
function hideAllElements() {
  hideThumbnails();
  hideComments();
  hideVideoDescription();
}

function showAllElements() {
  showThumbnails();
  showComments();
  showVideoDescription();
}

// Initialize focus mode
function initializeFocusMode() {
  chrome.storage.local.get('isFocusMode', (data) => {
    if (data.isFocusMode) {
      hideAllElements();
    }
  });
}

// Run initialization when the page loads
initializeFocusMode();
