document.getElementById('fetchBtn').addEventListener('click', () => {

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

    const tab = tabs[0];

    document.getElementById('titleOutput').textContent = tab.title;
  });
});
