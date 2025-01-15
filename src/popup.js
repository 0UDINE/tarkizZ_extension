// Get all toggle buttons
const toggleButtons = document.querySelectorAll('#toggle');

// Add click handler for main focus mode toggle
toggleButtons[0].addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url.includes('youtube.com')) {
      // Inject the content script if it's not already loaded
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['src/content2.js']
      });
  
      // Send a message to the content script
      chrome.tabs.sendMessage(tab.id, { action: 'toggle' }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Could not establish connection:', chrome.runtime.lastError);
        } else {
          updateButtonText();
        }
      });
    } else {
      console.error('This extension only works on YouTube.');
    }
});

// Add click handlers for individual element toggles
toggleButtons[1].addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url.includes('youtube.com')) {
        chrome.tabs.sendMessage(tab.id, { action: 'toggleThumbnails' });
    }
});

toggleButtons[2].addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url.includes('youtube.com')) {
        chrome.tabs.sendMessage(tab.id, { action: 'toggleComments' });
    }
});

toggleButtons[3].addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url.includes('youtube.com')) {
        chrome.tabs.sendMessage(tab.id, { action: 'toggleVideoDescription' });
    }
});

function updateButtonText() {
    const mainToggleButton = toggleButtons[0];
    chrome.storage.local.get(['isFocusMode'], (result) => {
        const isFocusMode = result.isFocusMode || false;
        mainToggleButton.textContent = isFocusMode ? 'Disable Focus Mode' : 'Enable Focus Mode';
    });
}

// Initialize button text on popup load
updateButtonText();