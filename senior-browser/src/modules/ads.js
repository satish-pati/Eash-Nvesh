async function blockSpamAds() {
    const spamAdSelectors = [
        '[id*="banner"]',             // IDs containing "banner"
        '[class*="banner"]',          // Classes containing "banner"
        '[id*="sponsored"]',          // IDs containing "sponsored"
        '[class*="sponsored"]',       // Classes containing "sponsored"
        '[class*="promo"]',           // Promotional ads
        '[class*="advertisement"]',   // Known ad class used by many websites
        '[class*="adsbygoogle"]',     // Google ads
        '[id*="outbrain"]',           // Outbrain ad service
        '[id*="taboola"]',            // Taboola ad service
        '.popup-ad',                  // Pop-up ads
        '.ad-slot' ,                  // Ad slot class commonly used in layouts
        '.ad-container',              // General container for ads
        '[id*="doubleclick"]',        // DoubleClick ads
        '[class*="ad-wrapper"]',      // Ad wrappers
        '[id*="ad-content"]',         // Specific ad content sections
        '[id*="adsense"]',            // Ads by Google AdSense
        '[id*="advertorial"]',        // Sponsored content
        '[class*="ad-banner"]',       // Ad banners
        '[id*="adBanner"]',           // Specific ad banner ID
        '[id*="ad-section"]',         // Sections specifically used for ads
        '[id*="sponsored-post"]',     // Sponsored posts
        '[id*="adclick"]',            // Click ads
        '[id*="ads-box"]',            // Ads box
        '[id*="sponsored-ad"]',       // Sponsored ads
        '[class*="googlead"]',        // Google Ad-related classes
        '[id*="ad-row"]',             // Ad rows
        '[id*="ads-section"]'         // Ads section
    ];

    const spamKeywords = ['buy now', 'limited time', 'special offer', 'subscribe', 'exclusive deal'];

    const excludedDomains = ['mail.google.com', 'www.google.com','onedrive.live.com','classroom.google.com','drive.google.com'];  // Add domains to exclude (e.g., Gmail, Google search)

    function isWhitelisted() {
        const currentDomain = window.location.hostname;
        return excludedDomains.some(domain => currentDomain.includes(domain));
    }

    function processAds(ads) {
        ads.forEach(ad => {
            ad.style.filter = 'blur(5px)';
        });
    }

    function blockExistingAds() {
        if (isWhitelisted()) return; // Skip ad blocking on whitelisted domains

        spamAdSelectors.forEach(selector => {
            const ads = document.querySelectorAll(selector);
            processAds(ads);
        });
    }

    async function processImageAds(images) {
        for (const img of images) {
            try {
                const result = await Tesseract.recognize(img.src, 'eng');
                const detectedText = result.data.text.toLowerCase();

                // Check if detected text includes any spam keywords
                if (spamKeywords.some(keyword => detectedText.includes(keyword))) {
                    img.style.filter = 'blur(5px)';
                }
            } catch (error) {
                // Handle any OCR errors gracefully
                // console.error('Error processing image for OCR:', error);
            }
        }
    }

    function blockExistingImageAds() {
        if (isWhitelisted()) return; // Skip image ad blocking on whitelisted domains

        const images = document.querySelectorAll('img');
        processImageAds(images);
    }

    function blockIframeAds() {
        if (isWhitelisted()) return; // Skip iframe ad blocking on whitelisted domains

        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            iframe.style.filter = 'blur(5px)';
        });
    }

    // Mutation observer to handle dynamically added ads
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {  // Check if it's an element node
                    spamAdSelectors.forEach(selector => {
                        if (node.matches(selector)) {
                            processAds([node]);
                        }
                    });

                    if (node.tagName === 'IMG') {
                        processImageAds([node]);
                    } else if (node.tagName === 'IFRAME') {
                        blockIframeAds();
                    }
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // Block existing ads
    blockExistingAds();
    blockExistingImageAds();
    blockIframeAds();
}

//window.addEventListener('load', blockSpamAds);
    //const button = document.createElement('button');
  