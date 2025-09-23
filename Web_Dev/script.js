document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    themeToggle.textContent = dark ? "☀️" : "🌙";
    localStorage.setItem("theme", dark ? "dark" : "light");
  });

  // Chatbot Toggle
  const chatBtn = document.getElementById("chatbot-btn");
  const chatPop = document.getElementById("chatbot-popup");
  chatBtn.addEventListener("click", () => {
    const isVisible = chatPop.style.display === "block";
    chatPop.style.display = isVisible ? "none" : "block";
  });

  // Hero Background + Quotes
  const heroBgs = document.querySelectorAll(".hero-bg");
  const heroQuote = document.getElementById("hero-quote");
  const quotes = [
    "Discover Beautiful Destinations",
    "Explore the Wonders of India",
    "Adventure Awaits You",
    "Taste Local Cuisines"
  ];
  let index = 0;
  function nextHero() {
    heroBgs.forEach(bg => bg.classList.remove("active"));
    heroBgs[index].classList.add("active");
    heroQuote.style.opacity = 0;
    setTimeout(() => {
      heroQuote.textContent = quotes[index];
      heroQuote.style.opacity = 1;
    }, 500);
    index = (index + 1) % heroBgs.length;
  }
  nextHero();
  setInterval(nextHero, 4000);

  // Scroll reveal
  const revealEls = document.querySelectorAll(".section,.card,.food-card");
  function reveal() {
    const trig = window.innerHeight * 0.85;
    revealEls.forEach(el => {
      if (el.getBoundingClientRect().top < trig) {
        el.classList.add("show");
      }
    });
  }
  window.addEventListener("scroll", reveal);
  reveal();

  // Star Rating Logic
  const stars = document.querySelectorAll(".star-rating span");
  const ratingContainer = document.querySelector(".star-rating");
  let currentRating = 0;

  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      stars.forEach((s, i) => s.classList.toggle("hovered", i <= index));
    });

    star.addEventListener("click", () => {
      currentRating = index + 1;
      stars.forEach((s, i) => {
        s.classList.remove("hovered"); // Remove hover class on click
        s.classList.toggle("selected", i < currentRating);
      });
    });
  });

  ratingContainer.addEventListener("mouseout", () => {
    stars.forEach(s => s.classList.remove("hovered"));
    // Re-apply only the selected state
    stars.forEach((s, i) => {
      s.classList.toggle("selected", i < currentRating);
    });
  });
});
