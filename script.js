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

  time += 0.05; // Speed of animation
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
    time += 0.5;
  }, 16);

  // Reset after a brief moment for effect
  setTimeout(() => clearInterval(speedUp), 500);
});
