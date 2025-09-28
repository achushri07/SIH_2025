document.addEventListener('DOMContentLoaded', () => {

            // --- THEME TOGGLE ---
            const themeToggleBtn = document.getElementById('theme-toggle');
            const body = document.getElementById('body');
            const themeIcon = themeToggleBtn.querySelector('i');

            // Function to apply theme from localStorage on page load
            const applySavedTheme = () => {
                const savedTheme = localStorage.getItem('manali-theme');
                if (savedTheme === 'light') {
                    body.classList.add('light-theme');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    body.classList.remove('light-theme');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            };

            // Event listener for the theme toggle button
            themeToggleBtn.addEventListener('click', () => {
                body.classList.toggle('light-theme');

                if (body.classList.contains('light-theme')) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                    localStorage.setItem('manali-theme', 'light');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                    localStorage.setItem('manali-theme', 'dark');
                }
            });

            // Apply the saved theme as soon as the page loads
            applySavedTheme();


            // --- CUSTOM DROPDOWN LOGIC FOR CALCULATOR ---
            const customSelects = document.querySelectorAll('.custom-select-container');

            customSelects.forEach(container => {
                const trigger = container.querySelector('.custom-select-trigger');
                const options = container.querySelectorAll('.custom-option');

                options.forEach(option => {
                    option.addEventListener('click', () => {
                        trigger.querySelector('span').textContent = option.textContent;
                        trigger.setAttribute('data-selected-value', option.getAttribute('data-value'));
                    });
                });
            });

            // --- BUDGET CALCULATOR ---
            const calculateBtn = document.getElementById('calculate-btn');
            calculateBtn.addEventListener('click', () => {
                const cityInput = document.getElementById("city").value.trim().toLowerCase();
                const tripType = document.querySelector('#calculator .custom-select-container:nth-of-type(1) .custom-select-trigger').getAttribute('data-selected-value') || 'one-way';
                const fuelType = document.querySelector('#calculator .custom-select-container:nth-of-type(2) .custom-select-trigger').getAttribute('data-selected-value') || 'petrol';
                const mileage = parseFloat(document.getElementById("mileage").value);
                const resultContainer = document.getElementById("result-container");
                const resultContent = document.getElementById("result-content");

                const distances = { "delhi": 540, "chandigarh": 310, "shimla": 250, "mumbai": 1950, "kolkata": 2100, "bangalore": 2700 };
                const fuelPrices = { "petrol": 95.00, "diesel": 88.00, "cng": 76.00 };

                if (!cityInput || isNaN(mileage) || mileage <= 0) {
                    resultContent.innerHTML = `<p style="color:red; text-align:center;">Please fill in all the details correctly.</p>`;
                    resultContainer.classList.add('visible');
                    return;
                }

                const distance = distances[cityInput];
                if (!distance) {
                    resultContent.innerHTML = `<p style="color:red; text-align:center;">Distance not available. Try Delhi, Chandigarh, Shimla, etc.</p>`;
                    resultContainer.classList.add('visible');
                    return;
                }

                const fuelPrice = fuelPrices[fuelType];
                let totalDistance = (tripType === "round-trip") ? distance * 2 : distance;
                const fuelNeeded = totalDistance / mileage;
                const estimatedBudget = fuelNeeded * fuelPrice;

                const resultHTML = `
            <h3>Trip Details:</h3>
            <p><strong>City:</strong> ${cityInput.charAt(0).toUpperCase() + cityInput.slice(1)}</p>
            <p><strong>Trip Type:</strong> ${tripType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            <p><strong>Fuel Type:</strong> ${fuelType.charAt(0).toUpperCase() + fuelType.slice(1)}</p>
            <p><strong>Total Distance:</strong> ${totalDistance} km</p>
            <hr style="border-color: rgba(255,255,255,0.1); margin: 15px 0;">
            <p style="font-size: 1.5rem; font-weight: bold;">Estimated Fuel Budget: ₹${estimatedBudget.toFixed(2)}</p>
        `;

                resultContent.innerHTML = resultHTML;
                resultContainer.classList.add('visible');
            });

            // --- INTERSECTION OBSERVER FOR CARD ANIMATIONS ---
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
                }, index * 150);
            });
        });
