const form = document.querySelector("#form");
const list = document.querySelector("#showsList");

// Perform query on user's input upon submission 
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    list.innerHTML = "";
    let userInput = form.elements.userInput.value;
    console.log(userInput);
    let shows = await searchQuery(userInput);
    createItem(shows);
    form.elements.userInput.value = "";
});

// API query
async function searchQuery(query) {
    try {
        let response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        let shows = await response.json();
        return shows;
    } catch (e) {
        console.log("Failed query...");
        return null;
    }
}

// Create new <li> for each TV show
function createItem(shows) {
    if (shows) {
        for (let show in shows) {
            let newShow = document.createElement("figure");
            let newName = document.createElement("figcaption");
            newName.innerText = shows[show].show.name;
            let newImg = document.createElement("img");
            if (shows[show].show.image) {
                newImg.src = shows[show].show.image.medium;
            } else {
                newImg.src = "/noImg.png";
            }
            newShow.append(newImg, newName);
            list.append(newShow);
        }
    } else {
        console.log("Something went wrong");
    }
}
