let queue = [];
let currentIndex = 0;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "START_SCRAPING") {
    queue = msg.links;
    currentIndex = 0;
    openNextProfile();
  }

  if (msg.type === "PROFILE_SCRAPED") {
    console.log("✅ Data received from content script:", msg.data);

    
    chrome.storage.local.get("scrapedProfiles", (result) => {
      const existing = result.scrapedProfiles || [];
      existing.push(msg.data);
      chrome.storage.local.set({ scrapedProfiles: existing }, () => {
        console.log("💾 Profile saved to chrome.storage.local");
      });
    });

    
    sendToAPI(msg.data);

    currentIndex++;
    if (currentIndex < queue.length) {
      setTimeout(openNextProfile, 1000);
    } else {
      console.log("🎉 All profiles scraped.");
    }
  }
});

function openNextProfile() {
  chrome.tabs.create({ url: queue[currentIndex], active: true });
}

function sendToAPI(data) {
  fetch("https://f5eb48b4c478.ngrok-free.app/api/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(res => console.log("📤 Sent to API:", res))
    .catch(err => console.error("❌ Error:", err));
}
