const MUSIC = {
  tracks: [
    "223 AM  しゃろう.mp3",
    // "music/track2.mp3",
  ],
  volume: 0.4,
};

const socials = [
  { name: "Facebook",  icon: "fa-brands fa-facebook-f",   url: "https://www.facebook.com/lhexter.villamor.3/" },
  { name: "Instagram", icon: "fa-brands fa-instagram",    url: "https://www.instagram.com/melon1010de/?hl=en" },
  { name: "Discord",    icon: "fa-brands fa-discord",       url: "https://discord.gg/x8nfxhY2" },
  { name: "Steam",  icon: "fa-brands fa-steam",  url: "https://steamcommunity.com/profiles/76561198972082621/" },
];

const socialsBox = document.getElementById("socials");
if (socialsBox) socials.forEach(({ name, icon, url }) => {
  const link = document.createElement("a");
  link.className = "social";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.title = name;
  link.setAttribute("aria-label", name);

  const logo = document.createElement("i");
  logo.className = icon || "fa-solid fa-link";
  link.appendChild(logo);

  socialsBox.appendChild(link);
});

document.getElementById("year").textContent = new Date().getFullYear();

const themeBtn = document.getElementById("themeBtn");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
setTheme(savedTheme || "light");

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

const musicBtn = document.getElementById("musicBtn");
const audio = new Audio();
audio.volume = MUSIC.volume;
let trackIndex = 0;

function loadTrack(i) {
  trackIndex = i % MUSIC.tracks.length;
  audio.src = MUSIC.tracks[trackIndex];
}
function setMusicUI(on) {
  musicBtn.textContent = on ? "Music: On" : "Music: Off";
  musicBtn.setAttribute("aria-pressed", on);
}
function playMusic() {
  audio.play().then(() => setMusicUI(true)).catch(() => setMusicUI(false));
}

if (MUSIC.tracks.length === 0) {
  musicBtn.hidden = true;
} else {
  // Resume where the song was if the visitor moved between pages
  let wasOn = false, savedTrack = 0, savedTime = 0;
  try {
    wasOn = sessionStorage.getItem("musicOn") === "1";
    savedTrack = Number(sessionStorage.getItem("musicTrack")) || 0;
    savedTime = Number(sessionStorage.getItem("musicTime")) || 0;
  } catch (e) {}

  loadTrack(savedTrack);
  if (savedTime) {
    audio.addEventListener("loadedmetadata", () => { audio.currentTime = savedTime; }, { once: true });
  }
  if (wasOn) playMusic();

  musicBtn.addEventListener("click", () => {
    if (audio.paused) playMusic();
    else { audio.pause(); setMusicUI(false); }
  });
  audio.addEventListener("ended", () => { loadTrack(trackIndex + 1); playMusic(); });
  audio.addEventListener("error", () => {
    setMusicUI(false);
    musicBtn.title = "Music file not found. Check the MUSIC settings in script.js";
  });

  window.addEventListener("pagehide", () => {
    try {
      sessionStorage.setItem("musicOn", audio.paused ? "0" : "1");
      sessionStorage.setItem("musicTrack", trackIndex);
      sessionStorage.setItem("musicTime", audio.currentTime);
    } catch (e) {}
  });
}

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", false);
  })
);

const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("main section");
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link =>
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id)
      );
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
sections.forEach(s => navObserver.observe(s));

