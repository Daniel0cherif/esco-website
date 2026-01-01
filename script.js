// --- Visualizer Setup ---
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let width, height;

// Resize canvas to fill screen
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener("resize", resize);
resize();

// --- Animation Loop ---
let time = 0;
let speed = 0.02; // Base speed

function animate() {
  // Create a trail effect by fading out the previous frame slightly
  ctx.fillStyle = "rgba(5, 5, 5, 0.1)";
  ctx.fillRect(0, 0, width, height);

  ctx.beginPath();
  ctx.lineWidth = 2;

  // Draw a dynamic sine wave
  for (let x = 0; x < width; x++) {
    // Combine multiple sine waves for a "liquid" audio look
    const y =
      height / 2 +
      Math.sin(x * 0.01 + time) * 50 +
      Math.sin(x * 0.02 + time * 2) * 25;

    // Dynamic coloring based on position
    const r = Math.floor(120 + 120 * Math.sin(time + x * 0.01));
    const g = 0;
    const b = Math.floor(200 + 55 * Math.sin(time + x * 0.01));

    ctx.strokeStyle = `rgb(${r},${g},${b})`;

    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);

    // Draw vertical bars occasionally for a "beat" effect
    if (x % 20 === 0) {
      ctx.fillStyle = `rgba(${r},${g},${b}, 0.5)`;
      ctx.fillRect(x, y, 2, height / 2 - y);
    }
  }
  ctx.stroke();

  time += speed;
  requestAnimationFrame(animate);
}
animate();

// --- Interaction ---
const btn = document.getElementById("play-btn");
btn.addEventListener("click", () => {
  // In a real app, this would start the audio context or play a track
  btn.innerText = "VIBE ACTIVE";
  btn.style.borderColor = "#bc13fe";
  btn.style.color = "#bc13fe";
  btn.style.boxShadow = "0 0 50px #bc13fe";

  // Speed up animation to simulate high energy
  const speedUp = setInterval(() => {
    time += 0.1;
  }, 16);

  // Reset after a brief moment for effect
  setTimeout(() => {
    clearInterval(speedUp);
  }, 2000);
});

// --- Music Section Interaction ---
const tracks = document.querySelectorAll(".track-card");
const audioPlayer = new Audio(); // Create the audio player

tracks.forEach((track) => {
  track.addEventListener("click", () => {
    // Check if already playing
    const isPlaying = track.classList.contains("playing");

    // Reset all tracks
    tracks.forEach((t) => t.classList.remove("playing"));
    speed = 0.05; // Reset visualizer speed

    // Stop any currently playing music
    audioPlayer.pause();
    audioPlayer.currentTime = 0;

    if (!isPlaying) {
      // Play this track
      track.classList.add("playing");
      speed = 0.05; // Increase visualizer speed for music

      // Get the song path and play it
      const song = track.getAttribute("data-audio");
      if (song) {
        audioPlayer.src = song;
        audioPlayer.play();
      }
    }
  });
});
