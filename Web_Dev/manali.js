// Intersection Observer setup for card animations
const observerOptions = {
  root: null, // use the viewport
  rootMargin: '0px',
  threshold: 0.2 // trigger when 20% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add the 'in-view' class to trigger the animation
      entry.target.classList.add('in-view');
      // Stop observing once the element is animated
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Select all elements that should animate on scroll
const animatedCards = document.querySelectorAll('.card, .cuisine-card');
animatedCards.forEach(card => {
  observer.observe(card);
});

// Existing budget calculator function
function calculateBudget() {
  const cityInput = document.getElementById("city").value.trim().toLowerCase();
  const tripType = document.getElementById("tripType").value;
  const fuelType = document.getElementById("fuelType").value;
  const mileage = parseFloat(document.getElementById("mileage").value);
  const resultContainer = document.getElementById("result-container");
  const resultContent = document.getElementById("result-content");

  // Sample distances (in km) from major cities to Manali
  const distances = {
    "delhi": 540,
    "chandigarh": 310,
    "shimla": 250,
    "mumbai": 1950,
    "kolkata": 2100,
    "bangalore": 2700
  };

  // Sample average fuel prices in INR per litre/kg
  const fuelPrices = {
    "petrol": 95.00,
    "diesel": 88.00,
    "cng": 76.00
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
  let tripText = "One-Way";
  if (tripType === "round-trip") {
    totalDistance = distance * 2;
    tripText = "Round Trip";
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
