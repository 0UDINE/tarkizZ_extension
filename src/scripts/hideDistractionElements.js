const toggle = document.querySelector('.toggle');

toggle.addEventListener('click', hideSections );


function hideSections() {

    const thumbnailsSection = document.querySelector("ytd-watch-next-secondary-results-renderer");
    const commentSection = document.querySelector("ytd-item-section-renderer");
    const videoDescription = document.querySelector('#below');

    if (thumbnailsSection && commentSection) {
			commentSection.classList.add('hidden');
			thumbnailsSection.classList.add('hidden');
			videoDescription.classList.add('hidden');
    } else {
        console.warn("Sections not found!");
    }
}


// Set up a MutationObserver to detect when new content is added
let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            hideSections(); // Re-run the function when new nodes are added
        }
    });
});

// Start observing the document with the configured parameters
observer.observe(document.body, { childList: true, subtree: true });