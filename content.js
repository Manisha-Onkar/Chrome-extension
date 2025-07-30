setTimeout(() => {
  const extractData = () => {
    const name = document.querySelector("h1")?.innerText.trim() || "";
    const location = document.querySelector(".text-body-small.inline.t-black--light.break-words")?.innerText.trim() || "";

    const aboutElement = Array.from(document.querySelectorAll("div")).find(div =>
      div.innerText?.includes("About") && div.nextElementSibling
    );
    const about = aboutElement?.nextElementSibling?.innerText.trim() || "";

    const bio = document.querySelector(".text-body-medium.break-words")?.innerText.trim() || "";

    const followersMatch = document.body.innerText.match(/([\d,]+)\s+followers/i);
    const connectionsMatch = document.body.innerText.match(/([\d,]+)\s+connections/i);
    const followers = followersMatch ? parseInt(followersMatch[1].replace(/,/g, "")) : 0;
    const connections = connectionsMatch ? parseInt(connectionsMatch[1].replace(/,/g, "")) : 0;

    return {

      name,
      location,
      about,
      bio,
      followers,
      connections,
      url: window.location.href
      
    };
  };

  const data = extractData();

  chrome.runtime.sendMessage({
    type: "PROFILE_SCRAPED",
    data
  });

}, 1000); 
