const toast = document.querySelector("#toast");
let deferredInstallPrompt;
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

const installButtons = [
  document.querySelector("#install-button"),
  document.querySelector("#footer-install")
];

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButtons.forEach((button) => {
    if (button) button.hidden = false;
  });
});

installButtons.forEach((button) => {
  button?.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      showToast("Use your browser menu to add Orbit to your home screen.");
      return;
    }
    deferredInstallPrompt.prompt();
    const result = await deferredInstallPrompt.userChoice;
    if (result.outcome === "accepted") showToast("Orbit is ready on your device.");
    deferredInstallPrompt = null;
    installButtons.forEach((item) => {
      if (item) item.hidden = true;
    });
  });
});

window.addEventListener("appinstalled", () => showToast("Orbit installed successfully."));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
}
