const toast = document.querySelector("#toast");
const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2800);
};

document.querySelector("#scan-button").addEventListener("click", (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.innerHTML = '<span class="spark">✦</span> Scanning…';
  showToast("Scanning approved sources…");
  window.setTimeout(() => {
    button.disabled = false;
    button.innerHTML = '<span class="spark">✦</span> Scan for new jobs';
    showToast("Scan complete — 4 new matches found.");
  }, 1800);
});

document.querySelectorAll(".bookmark").forEach((button) => {
  button.addEventListener("click", () => {
    const saved = button.classList.toggle("saved");
    button.textContent = saved ? "♥" : "♡";
    showToast(saved ? "Job saved to your shortlist." : "Job removed from your shortlist.");
  });
});

document.querySelector("#skills-button").addEventListener("click", () => {
  document.querySelector("#profile").scrollIntoView({ behavior: "smooth" });
  showToast("Profile improvement checklist opened.");
});

document.querySelector(".mobile-menu").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => document.querySelector(".sidebar").classList.remove("open"));
});
