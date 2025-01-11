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
          showElements();
        } else {
          hideElements();
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

function hideElements() {
  const thumbnailsSection = document.querySelector("#secondary");
  const commentSection = document.querySelector("#comments");
  const videoDescription = document.querySelector('#below');

  if (thumbnailsSection) {
    thumbnailsSection.classList.add('hidden');
  } else {
    console.warn("Thumbnails section not found");
  }
  
  if (commentSection) {
    commentSection.classList.add('hidden');
  } else {
    console.warn("Comments section not found");
  }
  
  if (videoDescription) {
    videoDescription.classList.add('hidden');
  } else {
    console.warn("Video description not found");
  }
}

function showElements() {
  const thumbnailsSection = document.querySelector("#secondary");
  const commentSection = document.querySelector("#comments");
  const videoDescription = document.querySelector('#below');

  if (thumbnailsSection) {
    thumbnailsSection.classList.remove('hidden');
  }
  if (commentSection) {
    commentSection.classList.remove('hidden');
  }
  if (videoDescription) {
    videoDescription.classList.remove('hidden');
  }
}

// Initialize focus mode
function initializeFocusMode() {
  chrome.storage.local.get('isFocusMode', (data) => {
    if (data.isFocusMode) {
      hideElements();
    }
  });
}

// Run initialization when the page loads
initializeFocusMode();