function calculateDistance() {
  const city = document.getElementById("city").value.trim().toLowerCase();
  const distanceResult = document.getElementById("distanceResult");

  // Sample distances (in km) from major cities to Manali
  const distances = {
    "delhi": 540,
    "chandigarh": 310,
    "shimla": 250,
    "mumbai": 1950,
    "kolkata": 2100,
    "bangalore": 2700
  };

  if (distances[city]) {
    distanceResult.textContent = `Distance from ${city.charAt(0).toUpperCase() + city.slice(1)} to Manali is approximately ${distances[city]} km.`;
  } else {
    distanceResult.textContent = "Distance not available for this city. Try Delhi, Chandigarh, Shimla, Mumbai, Kolkata, or Bangalore.";
  }
}
