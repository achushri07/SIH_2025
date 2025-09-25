document.addEventListener("DOMContentLoaded", () => {
    let selectedFestival = null;
    let selectedHoliday = null;
    let selectedRating = 0;

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

    // Chatbot Functionality
    const chatBtn = document.getElementById("chatbot-btn");
    const chatPop = document.getElementById("chatbot-popup");
    const closeChatbotBtn = document.getElementById("close-chatbot");
    const sendChatBtn = document.getElementById("chatbot-send-btn");
    const chatInputField = document.getElementById("chatbot-input-field");
    const chatMessages = document.getElementById("chatbot-messages");

    const toggleChatbot = () => {
        const isVisible = chatPop.style.display === "flex";
        chatPop.style.display = isVisible ? "none" : "flex";
    };

    chatBtn.addEventListener("click", toggleChatbot);
    closeChatbotBtn.addEventListener("click", toggleChatbot);

    const appendMessage = (text, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleSendMessage = () => {
        const userText = chatInputField.value.trim();
        if (userText === '') return;
        appendMessage(userText, 'user');
        chatInputField.value = '';
        setTimeout(() => {
            const botResponse = "This is a simulated response. Full functionality requires a backend.";
            appendMessage(botResponse, 'bot');
        }, 600);
    };

    sendChatBtn.addEventListener("click", handleSendMessage);
    chatInputField.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Hero Background Slider
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
        if (heroBgs.length === 0) return;
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

    // Scroll Reveal
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
    stars.forEach((star, index) => {
        star.addEventListener("mouseover", () => {
            stars.forEach((s, i) => s.classList.toggle("hovered", i <= index));
        });
        star.addEventListener("click", () => {
            selectedRating = index + 1;
            stars.forEach((s, i) => {
                s.classList.remove("hovered");
                s.classList.toggle("selected", i < selectedRating);
            });
        });
    });
    ratingContainer.addEventListener("mouseout", () => {
        stars.forEach(s => s.classList.remove("hovered"));
        stars.forEach((s, i) => {
            s.classList.toggle("selected", i < selectedRating);
        });
    });

    // Dropdown selection logic
    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        const valueSpan = dropdown.querySelector('.selected-value');
        if (!valueSpan) return;
        dropdown.querySelectorAll('.option-yn').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedValue = option.getAttribute('data-value');
                const dataType = option.getAttribute('data-type');
                valueSpan.textContent = `: ${selectedValue}`;
                if (dataType === 'festival') selectedFestival = selectedValue;
                else if (dataType === 'holiday') selectedHoliday = selectedValue;
            });
        });
    });

    // Prediction button (Placeholder functionality)
    const predictionBtn = document.getElementById('prediction-btn');
    const planTripBtn = document.getElementById('plan-trip-btn');
    const getPredictions = () => {
        const destination = document.getElementById('destination-input').value.trim();
        if (!destination || !selectedFestival || !selectedHoliday || selectedRating === 0) {
            alert('Please fill in all fields: Destination, Festive Season, Holiday, and Hotel Rating.');
            return;
        }
        alert(`Getting predictions for ${destination}...\nThis is a front-end demonstration. A backend is needed for real predictions.`);
    };
    predictionBtn.addEventListener('click', getPredictions);
    planTripBtn.addEventListener('click', getPredictions);
});
