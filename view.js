
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("scrapedProfiles", (result) => {
    const profiles = result.scrapedProfiles || [];
    const container = document.getElementById("profileList");

    if (profiles.length === 0) {
      container.innerHTML = "<p>No profiles scraped yet.</p>";
      return;
    }

    container.innerHTML = profiles.map(profile => `
      <div class="profile-card">
        <h3>${profile.name}</h3>
        <p><strong>URL:</strong> <a href="${profile.url}" target="_blank">${profile.url}</a></p>
        <p><strong>About:</strong> ${profile.about}</p>
        <p><strong>Bio:</strong> ${profile.bio}</p>
        <p><strong>Location:</strong> ${profile.location}</p>
        <p><strong>Followers:</strong> ${profile.followers}</p>
        <p><strong>Connections:</strong> ${profile.connections}</p>
        <hr/>
      </div>
    `).join("");
  });
});


