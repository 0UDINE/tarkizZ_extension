document.getElementById('toggle').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url.includes('youtube.com')) {
      // Inject the content script if it's not already loaded
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['src/content.js']
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
  
  function updateButtonText() {
    const button = document.getElementById('toggle');
    chrome.storage.local.get(['isFocusMode'], (result) => {
      const isFocusMode = result.isFocusMode || false;
      button.textContent = isFocusMode ? 'Disable Focus Mode' : 'Enable Focus Mode';
    });
  }
  
  // Initialize button text on popup load
  updateButtonText();