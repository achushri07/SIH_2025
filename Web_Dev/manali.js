// Existing budget calculator function
function calculateBudget() {
  // Get values from hidden inputs, which are updated by the custom select logic
  const cityInput = document.getElementById("city").value.trim().toLowerCase();
  const tripType = document.getElementById("tripType").value;
  const fuelType = document.getElementById("fuelType").value;
  const mileage = parseFloat(document.getElementById("mileage").value);
  const resultContainer = document.getElementById("result-container");
  const resultContent = document.getElementById("result-content");

  // Sample distances (in km) from major cities to Manali
  const distances = {
    "delhi": 501,
    "chandigarh": 269,
    "shimla": 239,
    "mumbai": 1901,
    "kolkata": 2041,
    "bangalore": 2660
  };

  // Sample average fuel prices in INR per litre/kg
  const fuelPrices = {
    "petrol": 100.87,
    "diesel": 89.45,
    "cng": 83.79
  };

  // Input validation
  if (!cityInput || isNaN(mileage) || mileage <= 0) {
    resultContent.innerHTML = `<p style="color:red; text-align:center;">Please fill in all the details correctly.</p>`;
    resultContainer.classList.add('visible');
    return;
  }

  const distance = distances[cityInput];
  if (!distance) {
    resultContent.innerHTML = `<p style="color:red; text-align:center;">Distance not available for this city. Try Delhi, Chandigarh, Shimla, Mumbai, Kolkata, or Bangalore.</p>`;
    resultContainer.classList.add('visible');
    return;
  }

  const fuelPrice = fuelPrices[fuelType];
  let totalDistance = distance;
  let tripText = tripType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '); // Capitalize and space
  if (tripType === "round-trip") {
    totalDistance = distance * 2;
  }

  // Fuel cost calculation
  const fuelNeeded = totalDistance / mileage;
  const estimatedBudget = fuelNeeded * fuelPrice;

  // Dynamically generate the content
  const resultHTML = `
        <h3>Trip Details:</h3>
        <p><strong>City:</strong> ${cityInput.charAt(0).toUpperCase() + cityInput.slice(1)}</p>
        <p><strong>Trip Type:</strong> ${tripText}</p>
        <p><strong>Fuel Type:</strong> ${fuelType.charAt(0).toUpperCase() + fuelType.slice(1)}</p>
        <p><strong>Mileage:</strong> ${mileage} km/L or kg</p>
        <p><strong>Total Distance:</strong> ${totalDistance} km</p>
        <hr style="border-color: rgba(255,255,255,0.1); margin: 15px 0;">
        <p style="font-size: 1.5rem; font-weight: bold;">Estimated Budget: ₹${estimatedBudget.toFixed(2)}</p>
    `;

  // Display the result
  resultContent.innerHTML = resultHTML;
  resultContainer.classList.add('visible');
}

// Function to toggle between light and dark themes
function toggleTheme() {
  const body = document.getElementById('body');
  const themeIcon = document.querySelector('.theme-btn i');

  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  } else {
    body.classList.add('light-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}

// *** ADDED: Custom Select Interaction Logic ***
document.addEventListener('DOMContentLoaded', () => {
  // Existing Intersection Observer setup for card animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedCards = document.querySelectorAll('.card, .cuisine-card');
  animatedCards.forEach((card, index) => {
    setTimeout(() => {
      observer.observe(card);
    }, index * 200);
  });

  // New Custom Select Logic
  const customSelects = document.querySelectorAll('.custom-select');

  customSelects.forEach(selectContainer => {
    const optionsList = selectContainer.querySelector('.select-options');
    const displayBox = selectContainer.querySelector('.select-display');
    const targetId = optionsList.getAttribute('data-target-id');
    const hiddenInput = document.getElementById(targetId);

    // Handle selection of an option
    optionsList.querySelectorAll('li').forEach(option => {
      option.addEventListener('click', function (event) {
        const newValue = this.getAttribute('data-value');
        const newText = this.textContent;

        // 1. Update the hidden input value (used by calculateBudget)
        hiddenInput.value = newValue;

        // 2. Update the display box text and value attribute
        displayBox.textContent = newText;
        displayBox.setAttribute('data-value', newValue);

        // 3. Close the dropdown (optional for hover, but good practice)
        // selectContainer.classList.remove('active');
      });
    });

    // Close dropdown when clicking outside (Crucial for custom selects)
    document.addEventListener('click', (e) => {
      if (!selectContainer.contains(e.target) && selectContainer.classList.contains('active')) {
        // selectContainer.classList.remove('active');
      }
    });

    // REMOVED: Block that automatically set the display text on load
    /*
    const initialOption = optionsList.querySelector(`li[data-value="${hiddenInput.value}"]`);
    if (initialOption) {
        displayBox.textContent = initialOption.textContent;
        displayBox.setAttribute('data-value', initialOption.getAttribute('data-value'));
    }
    */
  });
});
