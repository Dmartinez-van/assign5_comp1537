// Array of background images
const backgroundImages = [
  "url('../img/backgroundCliff-1.jpg')",
  "url('../img/backgroundGrass-2.png')",
  "url('../img/backgroundGrass-1.png')",
  "url('../img/backgroundPath-1.png')",
];

let currentIndex = 0;
// let rN = Math.floor(Math.random() * 20);
// let prevRN;

// Function to change the background image
function changeBackgroundImage() {
  const heroElement = document.getElementById("hero");
  heroElement.style.backgroundImage = backgroundImages[currentIndex];
  currentIndex = (currentIndex + 1) % backgroundImages.length;
}

function getPokeStats(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      callback(this.responseText);
    } else {
      console.log(this.status);
    }
  };
  xhr.open("GET", url);
  xhr.send();
}

document.querySelector("#stats").addEventListener("click", (e) => {
  getPokeStats("pokemon-stats?format=json", (data) => {
    let parsedData = JSON.parse(data);
    console.log("Call to server for JSON data : ", { parsedData });

    let card = document.querySelector(".card");
    let img = card.querySelector("#pokeImg");
    let id = card.querySelector("#pokeID");
    let name = card.querySelector("#pokeName");
    let type = card.querySelector("#pokeType");
    let hp = card.querySelector("#pokeHP");
    let attack = card.querySelector("#pokeAttack");
    let defense = card.querySelector("#pokeDefense");
    let speed = card.querySelector("#pokeSpeed");

    img.src = parsedData.img;
    id.innerHTML = parsedData.id;
    name.innerHTML = parsedData.name;
    type.innerHTML = parsedData.type;
    hp.innerHTML = parsedData.hp;
    attack.innerHTML = parsedData.attack;
    defense.innerHTML = parsedData.defense;
    speed.innerHTML = parsedData.speed;
  });
});

document.querySelector("#character").addEventListener("click", (e) => {
  getPokeStats("pokemon-character?format=html", (data) => {
    console.log("html data recieved: ", data);
    document.getElementById("html-card").innerHTML = data;
  });
});

// Change the background image every 12 seconds
setInterval(changeBackgroundImage, 12000);

// Initial background image
changeBackgroundImage();
