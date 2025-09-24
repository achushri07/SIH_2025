document.addEventListener("DOMContentLoaded", () => {
  // Global variables to store user selections
  let selectedFestival = null;
  let selectedHoliday = null;
  let selectedRating = 0;

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

  // Enhanced Chatbot Toggle and Functionality
  const chatBtn = document.getElementById("chatbot-btn");
  const chatPop = document.getElementById("chatbot-popup");
  const chatInput = chatPop.querySelector('input');
  const chatMessages = document.createElement('div');

  // Add chat messages container to popup
  chatMessages.className = 'chat-messages';
  chatPop.insertBefore(chatMessages, chatInput);

  chatBtn.addEventListener("click", () => {
    const isVisible = chatPop.style.display === "block";
    chatPop.style.display = isVisible ? "none" : "block";
  });

  // Handle chat input
  chatInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter' && chatInput.value.trim()) {
      await sendMessage(chatInput.value.trim());
      chatInput.value = '';
    }
  });

  async function sendMessage(message) {
    // Add user message to chat
    addMessageToChat('user', message);

    // Show loading
    addMessageToChat('bot', 'Thinking...');

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
      });

      const data = await response.json();

      // Remove loading message and add bot response
      chatMessages.removeChild(chatMessages.lastChild);

      if (data.status === 'success') {
        addMessageToChat('bot', data.response);
      } else {
        addMessageToChat('bot', 'Sorry, I encountered an error.');
      }
    } catch (error) {
      chatMessages.removeChild(chatMessages.lastChild);
      addMessageToChat('bot', 'Sorry, I could not connect to the server.');
    }
  }

  function addMessageToChat(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

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

  // Handle Yes/No dropdowns
  const optionDropdowns = document.querySelectorAll('.filter-dropdown');
  optionDropdowns.forEach(dropdown => {
    const valueSpan = dropdown.querySelector('.selected-value');
    if (!valueSpan) return;

    dropdown.querySelectorAll('.option-yn').forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedValue = option.getAttribute('data-value');
        const dataType = option.getAttribute('data-type');

        valueSpan.textContent = `: ${selectedValue}`;

        // Store the selected values
        if (dataType === 'festival') {
          selectedFestival = selectedValue;
        } else if (dataType === 'holiday') {
          selectedHoliday = selectedValue;
        }
      });
    });
  });

  // Prediction button event listener
  document.getElementById('prediction-btn').addEventListener('click', getPredictions);
  document.getElementById('plan-trip-btn').addEventListener('click', getPredictions);

  async function getPredictions() {
    const destination = document.getElementById('destination-input').value.trim();

    // Validation
    if (!destination) {
      alert('Please enter a destination!');
      return;
    }

    if (!selectedFestival) {
      alert('Please select Festive Season (Yes/No)!');
      return;
    }

    if (!selectedHoliday) {
      alert('Please select Holiday (Yes/No)!');
      return;
    }

    if (selectedRating === 0) {
      alert('Please select Hotel Rating!');
      return;
    }

    // Show loading modal
    document.getElementById('loading-modal').style.display = 'flex';

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: destination,
          festival: selectedFestival,
          holiday: selectedHoliday,
          hotel_rating: selectedRating
        })
      });

      const data = await response.json();

      // Hide loading modal
      document.getElementById('loading-modal').style.display = 'none';

      if (data.status === 'success') {
        displayResults(data);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      document.getElementById('loading-modal').style.display = 'none';
      alert('Error getting predictions: ' + error.message);
    }
  }

  function displayResults(data) {
    // Update weather info
    document.getElementById('weather-condition').textContent = data.weather.condition;
    document.getElementById('weather-temp').textContent = data.weather.temperature.toFixed(1);
    document.getElementById('weather-wind').textContent = data.weather.wind_speed.toFixed(1);

    // Update predictions
    const safetyResult = document.getElementById('safety-result');
    safetyResult.textContent = data.predictions.safety;

    // Add safety color coding
    safetyResult.className = 'result-value safety-' + data.predictions.safety.toLowerCase();

    document.getElementById('price-result').textContent = '₹' + data.predictions.price.toLocaleString();
    document.getElementById('popularity-result').textContent = data.predictions.popularity + '/100';

    // Show results section
    document.getElementById('results').style.display = 'block';

    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });

    // Add show class for animation
    setTimeout(() => {
      document.getElementById('results').classList.add('show');
    }, 100);
  }

  // Add event listeners for quick destination selection from cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const destination = card.querySelector('h4').textContent.split(' ')[0]; // Get first word
      document.getElementById('destination-input').value = destination;
    });
  });

  // Auto-complete suggestions for destinations
  const commonDestinations = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Vadodara',
    'Firozabad', 'Ludhiana', 'Rajkot', 'Agra', 'Siliguri', 'Nashik',
    'Faridabad', 'Patiala', 'Ghaziabad', 'Kalyan', 'Vasai-Virar',
    'Varanasi', 'Srinagar', 'Dhanbad', 'Jodhpur', 'Amritsar', 'Raipur',
    'Allahabad', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada',
    'Madurai', 'Guwahati', 'Chandigarh', 'Hubli', 'Amroha', 'Moradabad',
    'Goa', 'Udaipur', 'Ooty', 'Shimla', 'Manali', 'Darjeeling',
    'Rishikesh', 'Haridwar', 'Mysore', 'Kochi', 'Trivandrum', 'Calicut'
  ];

  const destinationInput = document.getElementById('destination-input');

  // Create datalist for autocomplete
  const datalist = document.createElement('datalist');
  datalist.id = 'destinations';
  commonDestinations.forEach(dest => {
    const option = document.createElement('option');
    option.value = dest;
    datalist.appendChild(option);
  });
  document.body.appendChild(datalist);
  destinationInput.setAttribute('list', 'destinations');

  // Enter key support for destination input
  destinationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      getPredictions();
    }
  });

  // Clear results when destination changes
  destinationInput.addEventListener('input', () => {
    document.getElementById('results').style.display = 'none';
  });

  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Add loading state to buttons
  function setButtonLoading(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.textContent = '⏳ Loading...';
    } else {
      button.disabled = false;
      if (button.id === 'prediction-btn') {
        button.textContent = '🔮 Get Predictions';
      } else {
        button.textContent = '✈️ Plan Your Trip';
      }
    }
  }

  // Enhanced error handling with retry functionality
  function showError(message, canRetry = false) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
      <div class="error-content">
        <h4>⚠️ Error</h4>
        <p>${message}</p>
        ${canRetry ? '<button onclick="this.parentElement.parentElement.remove()">Try Again</button>' : ''}
      </div>
    `;

    // Style the error message
    errorDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(244, 67, 54, 0.9);
      color: white;
      padding: 20px;
      border-radius: 10px;
      z-index: 3000;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      max-width: 400px;
      text-align: center;
    `;

    document.body.appendChild(errorDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentElement) {
        errorDiv.remove();
      }
    }, 5000);
  }

  // Add success animation for results
  function animateResults() {
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';

        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      }, index * 200);
    });
  }

  // Enhanced displayResults function
  const originalDisplayResults = displayResults;
  displayResults = function (data) {
    originalDisplayResults(data);
    animateResults();

    // Add confetti effect for good predictions
    if (data.predictions.safety === 'Safe' && data.predictions.popularity > 60) {
      // Simple confetti effect (you can enhance this)
      console.log('🎉 Great destination choice!');
    }
  };

  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to get predictions
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      getPredictions();
    }

    // Escape to close modals
    if (e.key === 'Escape') {
      document.getElementById('loading-modal').style.display = 'none';
      document.getElementById('chatbot-popup').style.display = 'none';
    }
  });

  // Add tooltip functionality
  function addTooltips() {
    const tooltipElements = [
      { selector: '.star-rating', text: 'Click stars to select hotel rating (1-5 stars)' },
      { selector: '#prediction-btn', text: 'Get AI-powered travel predictions' },
      { selector: '#destination-input', text: 'Enter any Indian city name' }
    ];

    tooltipElements.forEach(({ selector, text }) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute('title', text);
      }
    });
  }

  addTooltips();

  // Add social sharing functionality
  function shareResults(data) {
    if (navigator.share) {
      navigator.share({
        title: 'Xplor Bharat - Travel Predictions',
        text: `Check out my travel predictions for ${data.destination}! Safety: ${data.predictions.safety}, Price: ₹${data.predictions.price}, Popularity: ${data.predictions.popularity}/100`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `Check out my travel predictions for ${data.destination}! Visit ${window.location.href}`;
      navigator.clipboard.writeText(text).then(() => {
        alert('Results copied to clipboard!');
      });
    }
  }

  // Initialize page
  console.log('🚀 Xplor Bharat initialized successfully!');
});