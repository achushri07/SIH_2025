// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Chatbot
const chatbotBtn = document.getElementById("chatbot-btn");
const chatbotPopup = document.getElementById("chatbot-popup");

chatbotBtn.addEventListener("click", () => {
  chatbotPopup.style.display = chatbotPopup.style.display === "block" ? "none" : "block";
});
