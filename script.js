// 🌙 Theme Toggle with Local Storage
const themeToggle = document.getElementById("theme-toggle");

// Load saved theme on page load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// 💬 Chatbot Popup with Smooth Animation
const chatbotBtn = document.getElementById("chatbot-btn");
const chatbotPopup = document.getElementById("chatbot-popup");

chatbotBtn.addEventListener("click", () => {
  if (chatbotPopup.style.display === "block") {
    chatbotPopup.style.opacity = "0";
    setTimeout(() => chatbotPopup.style.display = "none", 300);
  } else {
    chatbotPopup.style.display = "block";
    setTimeout(() => chatbotPopup.style.opacity = "1", 10);
  }
});

// 🔗 Smooth Scroll for Navbar Links
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// 👀 Scroll Reveal Animations
const revealElements = document.querySelectorAll(".section, .hero-content, .card, .food-card");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // run once on load
// 🎞️ Smooth Hero Background Slideshow
const heroBgs = document.querySelectorAll(".hero-bg");
let bgIndex = 0;

function showNextBg() {
  heroBgs.forEach((bg, i) => {
    bg.classList.remove("active");
    if (i === bgIndex) {
      bg.classList.add("active");
    }
  });

  bgIndex = (bgIndex + 1) % heroBgs.length;
}

// Show first image immediately
showNextBg();

// Change every 4 seconds
setInterval(showNextBg, 4000);

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


document.addEventListener("DOMContentLoaded", () => {
  // 🌟 Hero Background Slideshow with Quotes
  const heroBgs = document.querySelectorAll(".hero-bg");
  const heroQuoteEl = document.getElementById("hero-quote");

  const heroQuotes = [
    "Discover Beautiful Destinations",
    "Explore the Wonders of India",
    "Adventure Awaits You",
    "Taste Local Cuisines"
  ];

  let bgIndex = 0;

  function showNextHero() {
    heroBgs.forEach((bg, i) => bg.classList.remove("active"));
    heroBgs[bgIndex].classList.add("active");

    // Animate quote: fade out + slide up
    heroQuoteEl.style.opacity = 0;
    heroQuoteEl.style.transform = "translateY(-20px) scale(0.95)";

    setTimeout(() => {
      // Change text
      heroQuoteEl.textContent = heroQuotes[bgIndex];

      // Animate fade in + slide down + slight scale
      heroQuoteEl.style.opacity = 1;
      heroQuoteEl.style.transform = "translateY(0) scale(1)";

      // Next index
      bgIndex = (bgIndex + 1) % heroBgs.length;
    }, 800);
  }


  // Initial display
  showNextHero();

  // Change every 4 seconds
  setInterval(showNextHero, 4000);

  // 🌙 Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  // 💬 Chatbot Toggle
  const chatbotBtn = document.getElementById("chatbot-btn");
  const chatbotPopup = document.getElementById("chatbot-popup");

  chatbotBtn.addEventListener("click", () => {
    chatbotPopup.style.display = chatbotPopup.style.display === "block" ? "none" : "block";
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
