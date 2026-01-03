const player = document.getElementById("player");
const thumbnail = document.getElementById("thumbnail");
const loader = document.getElementById("loader");
const muteBtn = document.getElementById("muteBtn");

let isMuted = true;

/* Get VIDEO_ID from URL */
function getVideoIdFromPath() {
  const path = window.location.pathname.replace("/", "").trim();
  return path || null;
}

const videoId = getVideoIdFromPath();

if (!videoId) {
  loader.style.display = "none";
  alert("वीडियो नहीं मिला");
} else {
  /* Thumbnail (UI only) */
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  thumbnail.style.backgroundImage = `url(${thumbUrl})`;

  /* 🔒 AUTOPLAY + MUTED (REQUIRED) */
  player.src =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1` +
    `&mute=1` +
    `&playsinline=1` +
    `&controls=0` +
    `&rel=0` +
    `&modestbranding=1` +
    `&iv_load_policy=3` +
    `&fs=0` +
    `&disablekb=1`;

  player.onload = () => {
    loader.style.display = "none";
    thumbnail.style.display = "none";
  };
}

/* 🔊 CUSTOM MUTE / UNMUTE */
muteBtn.addEventListener("click", () => {
  if (!videoId) return;

  // 🔥 USER-INITIATED RESTART WITH SOUND
  player.src =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1` +
    `&mute=0` +
    `&playsinline=1` +
    `&controls=0` +
    `&rel=0` +
    `&modestbranding=1` +
    `&iv_load_policy=3` +
    `&fs=0` +
    `&disablekb=1`;

  muteBtn.style.display = "none"; // optional: hide after use
});

/* External credit (policy safe) */
function openInYouTube() {
  window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
}

function openInApp() {
  window.location.href = `bhaktibhajan://video/${videoId}`;
}
