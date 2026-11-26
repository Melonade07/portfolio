const games = [
  { name: "Monster Hunter: Wilds",   image: "https://www.monsterhunter.com/wilds/assets/img/product/MHWilds_normal.png", url: "https://store.steampowered.com/app/2246340/Monster_Hunter_Wilds/" },
{ name: "Monster Hunter: World Iceborne",   image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1118010/capsule_616x353.jpg?t=1727684185", url: "https://store.steampowered.com/app/582010/Monster_Hunter_World/" },
{ name: "Monster Hunter: Rise Sunbreak",   image: "https://monsterhunterwiki.org/images/9/9b/MHRS-Box_Art.jpg", url: "https://store.steampowered.com/app/1446780/MONSTER_HUNTER_RISE/" },

  { name: "Genshin Impact",   image: "https://static.wikia.nocookie.net/gensin-impact/images/8/80/Genshin_Impact.png/revision/latest?cb=20240331104358", url: "https://genshin.hoyoverse.com/en/" },
  { name: "HITMAN World of Assassination", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStXttnrqdd-_XN0q7Eh4WxERhZ3L6y_-Cb6_si_iI-abRCFLdecRhrpS4&s=10", url: "https://store.steampowered.com/app/1659040/HITMAN_World_of_Assassination/" },
{ name: "ARK: Survival Evolved", image: "https://upload.wikimedia.org/wikipedia/en/2/2b/ArkSurvivalEvolved.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original", url: "https://store.steampowered.com/app/346110/ARK_Survival_Evolved/" },
{ name: "Umamusume: Pretty Derby", image: "https://upload.wikimedia.org/wikipedia/en/3/31/Umamusume_Pretty_Derby_game_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original", url: "https://umamusume.com" },

];


const gamesBox = document.getElementById("games");
games.forEach(({ name, image, url }) => {
  const tile = document.createElement("a");
  tile.className = "game";
  tile.href = url;
  tile.target = "_blank";
  tile.rel = "noopener noreferrer";
  tile.setAttribute("aria-label", name);

  const pic = document.createElement("img");
  pic.src = image;
  pic.alt = "";
  pic.loading = "lazy";
  pic.addEventListener("error", () => { pic.remove(); tile.classList.add("no-image"); });

  const label = document.createElement("span");
  label.className = "game-name";
  label.textContent = name;

  tile.append(pic, label);
  gamesBox.appendChild(tile);
});
