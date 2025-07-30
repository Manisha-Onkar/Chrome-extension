// Handle "Start Scraping" button
document.getElementById("startBtn").addEventListener("click", () => {
  const rawInput = document.getElementById("links").value;

  const links = rawInput
    .split("\n")
    .map(link => link.trim().replace(/[>\s]+$/g, ""))
    .filter(link => link.startsWith("https://") && link.includes("linkedin.com/in"));

  if (links.length === 0) {
    alert("Please enter at least one valid LinkedIn profile link.");
    return;
  }

  chrome.runtime.sendMessage({ type: "START_SCRAPING", links });
});


document.getElementById("viewBtn").addEventListener("click", () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("view.html") });
});


