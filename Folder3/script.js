document.addEventListener('DOMContentLoaded', () => {

    // =============================================================
    // ===== SHARED & XPLOR BHARAT SCRIPT =====
    // =============================================================

    let selectedFestival = null, selectedHoliday = null, selectedRating = 0, isSpeaking = false;
    const translations = {
        en: { nav_home: 'Home', nav_features: 'Features', nav_ai_planner: 'AI Planner', nav_tts: 'Text to Speech', nav_explore: 'Explore', nav_top_destinations: 'Top destinations', nav_indian_delicacy: 'Indian Delicacy', nav_filter: 'Filter', nav_language: 'Language', hero_quote: 'Discover Beautiful Destinations', search_placeholder: '🔍 Enter destination city...', plan_trip_btn: '✈️ Plan Your Trip', filter_duration: 'Duration', filter_to: 'to', filter_festive: 'Festive Season', filter_holiday: 'Holiday', filter_yes: 'Yes', filter_no: 'No', filter_rating: 'Hotel Rating', get_predictions_btn: '🔮 Get Predictions' },
        hi: { nav_home: 'होम', nav_features: 'विशेषताएँ', nav_ai_planner: 'एआई प्लानर', nav_tts: 'टेक्स्ट टू स्पीच', nav_explore: 'अन्वेषण करें', nav_top_destinations: 'शीर्ष गंतव्य', nav_indian_delicacy: 'भारतीय व्यंजन', nav_filter: 'फ़िल्टर', nav_language: 'भाषा', hero_quote: 'सुंदर स्थलों की खोज करें', search_placeholder: '🔍 गंतव्य शहर दर्ज करें...', plan_trip_btn: '✈️ अपनी यात्रा की योजना बनाएं', filter_duration: 'अवधि', filter_to: 'तक', filter_festive: 'त्योहार का मौसम', filter_holiday: 'छुट्टी', filter_yes: 'हाँ', filter_no: 'नहीं', filter_rating: 'होटल रेटिंग', get_predictions_btn: '🔮 भविष्यवाणियाँ प्राप्त करें' },
        mr: { nav_home: 'मुख्यपृष्ठ', nav_features: 'वैशिष्ट्ये', nav_ai_planner: 'एआय प्लॅनर', nav_tts: 'टेक्स्ट टू स्पीच', nav_explore: 'अन्वेषण करा', nav_top_destinations: 'शीर्ष गंतव्ये', nav_indian_delicacy: 'भारतीय स्वादिष्ट पदार्थ', nav_filter: 'फिल्टर', nav_language: 'भाषा', hero_quote: 'सुंदर स्थळांचा शोध घ्या', search_placeholder: '🔍 गंतव्य शहर प्रविष्ट करा...', plan_trip_btn: '✈️ आपल्या सहलीची योजना करा', filter_duration: 'कालावधी', filter_to: 'पर्यंत', filter_festive: 'सणासुदीचा हंगाम', filter_holiday: 'सुट्टी', filter_yes: 'होय', filter_no: 'नाही', filter_rating: 'हॉटेल रेटिंग', get_predictions_btn: '🔮 अंदाज मिळवा' },
        es: { nav_home: 'Inicio', nav_features: 'Características', nav_ai_planner: 'Planificador de IA', nav_tts: 'Texto a voz', nav_explore: 'Explorar', nav_top_destinations: 'Mejores destinos', nav_indian_delicacy: 'Delicadeza india', nav_filter: 'Filtro', nav_language: 'Idioma', hero_quote: 'Descubre Destinos Hermosos', search_placeholder: '🔍 Ingrese la ciudad de destino...', plan_trip_btn: '✈️ Planifica Tu Viaje', filter_duration: 'Duración', filter_to: 'a', filter_festive: 'Temporada festiva', filter_holiday: 'Feriado', filter_yes: 'Sí', filter_no: 'No', filter_rating: 'Calificación del hotel', get_predictions_btn: '🔮 Obtener Predicciones' }
    };
    const setLanguage = (lang) => { document.querySelectorAll('[data-translate]').forEach(el => { const key = el.getAttribute('data-translate'); if (translations[lang]?.[key]) el.placeholder ? el.placeholder = translations[lang][key] : el.innerHTML = translations[lang][key]; }); localStorage.setItem('language', lang); };
    document.querySelectorAll('.lang-switcher').forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); setLanguage(e.target.getAttribute('data-lang')); }));
    setLanguage(localStorage.getItem('language') || 'en');
    document.getElementById('text-to-speech-btn').addEventListener('click', (e) => { e.preventDefault(); if (isSpeaking) { window.speechSynthesis.cancel(); isSpeaking = false; } else { let textToSpeak = ''; document.querySelectorAll('#xplor-bharat-content [data-translate]').forEach(el => textToSpeak += el.innerText + '. '); const utterance = new SpeechSynthesisUtterance(textToSpeak); utterance.lang = localStorage.getItem('language') || 'en'; utterance.onend = () => isSpeaking = false; window.speechSynthesis.speak(utterance); isSpeaking = true; } });
    const themeToggle = document.getElementById("theme-toggle");
    if (localStorage.getItem("theme") === "dark") { document.body.classList.add("dark"); themeToggle.textContent = "☀️"; }
    themeToggle.addEventListener("click", () => { document.body.classList.toggle("dark"); const dark = document.body.classList.contains("dark"); themeToggle.textContent = dark ? "☀️" : "🌙"; localStorage.setItem("theme", dark ? "dark" : "light"); });
    const chatBtn = document.getElementById("chatbot-btn"), chatPop = document.getElementById("chatbot-popup"), closeChatbotBtn = document.getElementById("close-chatbot"), sendChatBtn = document.getElementById("chatbot-send-btn"), chatInputField = document.getElementById("chatbot-input-field"), chatMessages = document.getElementById("chatbot-messages"), aiPlannerBtn = document.getElementById("ai-planner-btn");
    const toggleChatbot = () => { chatPop.style.display = chatPop.style.display === "flex" ? "none" : "flex"; };
    [chatBtn, closeChatbotBtn, aiPlannerBtn].forEach(btn => btn.addEventListener("click", (e) => { e.preventDefault(); toggleChatbot(); }));
    const appendMessage = (text, sender) => { const el = document.createElement('div'); el.className = `chat-message ${sender}-message`; el.textContent = text; chatMessages.appendChild(el); chatMessages.scrollTop = chatMessages.scrollHeight; };
    const handleSendMessage = () => { const userText = chatInputField.value.trim(); if (userText) { appendMessage(userText, 'user'); chatInputField.value = ''; setTimeout(() => appendMessage("This is a simulated response. Full functionality requires a backend.", 'bot'), 600); } };
    sendChatBtn.addEventListener("click", handleSendMessage);
    chatInputField.addEventListener("keypress", (e) => { if (e.key === 'Enter') handleSendMessage(); });
    const heroBgs = document.querySelectorAll(".hero-bg"), heroQuote = document.getElementById("hero-quote"), quotes = { en: ["Discover Beautiful Destinations", "Explore the Wonders of India", "Adventure Awaits You", "Taste Local Cuisines"], hi: ["सुंदर स्थलों की खोज करें", "भारत के अजूबों को खोजें", "साहसिक कार्य आपको बुला रहा है", "स्थानीय व्यंजनों का स्वाद लें"], mr: ["सुंदर स्थळांचा शोध घ्या", "भारताच्या आश्चर्यांचा शोध घ्या", "साहस तुमची वाट पाहत आहे", "स्थानिक पदार्थांची चव घ्या"], es: ["Descubre Destinos Hermosos", "Explora las Maravillas de la India", "La Aventura te Espera", "Prueba las Cocinas Locales"] };
    let idx = 0;
    const nextHero = () => { if (!heroBgs.length) return; heroBgs.forEach(bg => bg.classList.remove("active")); heroBgs[idx].classList.add("active"); const lang = localStorage.getItem('language') || 'en'; heroQuote.style.opacity = 0; setTimeout(() => { heroQuote.textContent = quotes[lang][idx]; heroQuote.style.opacity = 1; }, 500); idx = (idx + 1) % heroBgs.length; };
    nextHero(); setInterval(nextHero, 4000);
    const revealEls = document.querySelectorAll("#xplor-bharat-content .section, #xplor-bharat-content .card, #xplor-bharat-content .food-card");
    const reveal = () => { const trig = window.innerHeight * 0.85; revealEls.forEach(el => { if (el.getBoundingClientRect().top < trig) el.classList.add("show"); }); };
    window.addEventListener("scroll", reveal); reveal();
    const stars = document.querySelectorAll(".star-rating span");
    stars.forEach((star, i) => { star.addEventListener("mouseover", () => stars.forEach((s, k) => s.classList.toggle("hovered", k <= i))); star.addEventListener("click", () => { selectedRating = i + 1; stars.forEach((s, k) => { s.classList.remove("hovered"); s.classList.toggle("selected", k < selectedRating); }); }); });
    document.querySelector(".star-rating").addEventListener("mouseout", () => { stars.forEach(s => s.classList.remove("hovered")); stars.forEach((s, k) => s.classList.toggle("selected", k < selectedRating)); });
    document.querySelectorAll('.filter-dropdown').forEach(dd => { const vs = dd.querySelector('.selected-value'); if (!vs) return; dd.querySelectorAll('.option-yn').forEach(opt => opt.addEventListener('click', e => { e.preventDefault(); const val = opt.dataset.value, type = opt.dataset.type, lang = localStorage.getItem('language') || 'en'; vs.textContent = `: ${val === 'Yes' ? translations[lang].filter_yes : translations[lang].filter_no}`; if (type === 'festival') selectedFestival = val; else if (type === 'holiday') selectedHoliday = val; })); });

    // =============================================================
    // ===== MANALI REDIRECT LOGIC (UNCHANGED) =====
    // =============================================================
    const getPredictions = () => {
        const destination = document.getElementById('destination-input').value.toLowerCase().trim();

        if (destination === 'manali') {
            const splashScreen = document.getElementById('manali-splash-logo');
            splashScreen.style.display = 'flex';
            void splashScreen.offsetWidth;
            splashScreen.classList.add('show');

            setTimeout(() => {
                window.location.href = 'manali-site.html';
            }, 3000);

            return;
        }

        if (!document.getElementById('destination-input').value.trim() || !selectedFestival || !selectedHoliday || selectedRating === 0) {
            alert('Please fill in all fields: Destination, Festive Season, Holiday, and Hotel Rating.');
            return;
        }
        alert(`Getting predictions for: ${destination.charAt(0).toUpperCase() + destination.slice(1)}...`);
    };

    document.getElementById('prediction-btn').addEventListener('click', getPredictions);
    document.getElementById('plan-trip-btn').addEventListener('click', getPredictions);


    // =============================================================
    // ===== NEW AI ITINERARY GENERATOR LOGIC (MERGED) =====
    // =============================================================

    const itState = {
        formData: { duration: '', interests: [], travelType: '', budget: '' },
        generatedItinerary: null,
        isGenerating: false,
    };

    const itInterests = [
        { id: 'waterfalls_lakes', label: 'Waterfalls & Lakes', icon: 'waves' },
        { id: 'adventure_trekking', label: 'Adventure & Trekking', icon: 'mountain' },
        { id: 'beaches_islands', label: 'Beaches & Islands', icon: 'ship' },
        { id: 'heritage_culture', label: 'Heritage & Culture', icon: 'landmark' },
        { id: 'nature_wildlife', label: 'Nature & Wildlife', icon: 'leaf' },
        { id: 'food_culinary', label: 'Food & Culinary', icon: 'utensils-crossed' },
        { id: 'shopping_markets', label: 'Shopping & Markets', icon: 'shopping-cart' },
        { id: 'festivals_nightlife', label: 'Festivals & Nightlife', icon: 'party-popper' }
    ];

    const itMockItineraries = {
        default: { title: "Spiritual Rishikesh Escape", days: [{ day: 1, title: "Arrival & Spiritual Evening", activities: [{ time: "2:00 PM", title: "Arrive in Rishikesh", description: "Check into a serene ashram or riverside hotel.", location: "Rishikesh", type: "transport" }, { time: "5:00 PM", title: "Ganga Aarti Ceremony", description: "Witness the mesmerizing evening prayer ceremony at Parmarth Niketan.", location: "Parmarth Niketan Ghat", type: "cultural" }, { time: "7:30 PM", title: "Sattvic Dinner", description: "Enjoy a healthy and pure vegetarian meal at a local cafe.", location: "Ram Jhula", type: "food" }] }, { day: 2, title: "Yoga, Beatles & Bridges", activities: [{ time: "7:00 AM", title: "Sunrise Yoga", description: "Participate in a morning yoga session overlooking the Ganges.", location: "Your Ashram/Hotel", type: "activity" }, { time: "10:00 AM", title: "Beatles Ashram Exploration", description: "Explore the graffiti-covered domes where The Beatles stayed.", location: "Beatles Ashram", type: "attraction" }, { time: "1:00 PM", title: "Cross Laxman Jhula", description: "Walk across the iconic suspension bridge with stunning river views.", location: "Laxman Jhula", type: "attraction" }] }] },
        adventure_trekking: { title: "Himalayan Trekking Adventure", days: [{ day: 1, title: "Manali to Chika", activities: [{ time: "9:00 AM", title: "Drive to Jobra", description: "Start your journey with a scenic drive from Manali to the trek starting point.", location: "Jobra", type: "transport" }, { time: "11:00 AM", title: "Trek to Chika", description: "A gentle 2-hour trek through lush forests to the beautiful campsite of Chika.", location: "Chika Campsite", type: "trekking" }, { time: "6:00 PM", title: "Campfire & Stargazing", description: "Enjoy dinner by the campfire under a clear Himalayan sky.", location: "Chika", type: "activity" }] }, { day: 2, title: "Trek to Balu ka Ghera", activities: [{ time: "8:00 AM", title: "Begin Trek", description: "Trek along the river, crossing streams and boulder sections.", location: "Trail to Balu ka Ghera", type: "trekking" }, { time: "2:00 PM", title: "Reach Campsite", description: "Arrive at Balu ka Ghera (Heap of Sand), a flat plain at the base of Hampta Pass.", location: "Balu ka Ghera", type: "attraction" }] }] },
        beaches_islands: { title: "Andaman Islands Paradise", days: [{ day: 1, title: "Arrival in Port Blair & Cellular Jail", activities: [{ time: "11:00 AM", title: "Arrive at Port Blair", description: "Transfer to your hotel and relax.", location: "Port Blair", type: "transport" }, { time: "3:00 PM", title: "Cellular Jail Visit", description: "Visit the historic colonial prison and learn about India's freedom struggle.", location: "Cellular Jail", type: "heritage_culture" }, { time: "6:00 PM", title: "Light & Sound Show", description: "Experience the moving saga of the freedom fighters at the Cellular Jail.", location: "Cellular Jail", type: "activity" }] }, { day: 2, title: "Havelock Island & Radhanagar Beach", activities: [{ time: "8:00 AM", title: "Ferry to Havelock", description: "Take a high-speed ferry to the stunning Havelock Island (Swaraj Dweep).", location: "Havelock Island", type: "transport" }, { time: "2:00 PM", title: "Radhanagar Beach", description: "Relax and swim at one of Asia's best beaches, known for its white sand and turquoise water.", location: "Radhanagar Beach", type: "attraction" }] }] },
        heritage_culture: { title: "Royal Rajasthan Discovery", days: [{ day: 1, title: "Jaipur: The Pink City", activities: [{ time: "10:00 AM", title: "Amer Fort", description: "Explore the magnificent hilltop fort with its intricate architecture and stunning views.", location: "Amer Fort", type: "attraction" }, { time: "2:00 PM", title: "City Palace", description: "Visit the royal residence, a beautiful blend of Rajput and Mughal architecture.", location: "City Palace, Jaipur", type: "heritage_culture" }, { time: "5:00 PM", title: "Hawa Mahal", description: "Admire the iconic 'Palace of Winds' with its unique five-story facade.", location: "Hawa Mahal", type: "attraction" }] }, { day: 2, title: "Jodhpur: The Blue City", activities: [{ time: "10:00 AM", title: "Mehrangarh Fort", description: "Discover one of India's largest forts, towering over the blue city.", location: "Mehrangarh Fort", type: "attraction" }, { time: "3:00 PM", title: "Jaswant Thada", description: "Visit the beautiful marble cenotaph built in memory of Maharaja Jaswant Singh II.", location: "Jaswant Thada", type: "heritage_culture" }] }] }
    };

    const itGetActivityIconName = (type) => ({ 'transport': 'car', 'attraction': 'map-pin', 'food': 'utensils-crossed', 'cultural': 'landmark', 'activity': 'gamepad-2', 'trekking': 'mountain', 'heritage_culture': 'palace' }[type] || 'map-pin');

    // --- DOM ELEMENTS (ITINERARY) ---
    const itGenerateBtn = document.getElementById('generate-btn-new');
    const itInterestContainer = document.getElementById('interest-buttons-container-it');
    const itItineraryContainer = document.getElementById('itinerary-container-it');

    // --- RENDER FUNCTIONS (ITINERARY) ---
    function itRenderInterestButtons() {
        if (!itInterestContainer) return;
        itInterestContainer.innerHTML = itInterests.map(interest => {
            const isSelected = itState.formData.interests.includes(interest.id);
            return `<button data-interest-id="${interest.id}" class="interest-btn justify-start h-auto p-3 text-left w-full flex items-center rounded-md ${isSelected ? 'selected' : ''}"><i data-lucide="${interest.icon}" class="mr-2 h-4 w-4"></i><span class="text-sm">${interest.label}</span></button>`;
        }).join('');
        lucide.createIcons();
    }

    function itRenderGenerateButton() {
        if (!itGenerateBtn) return;
        if (itState.isGenerating) {
            itGenerateBtn.innerHTML = `<div class="spinner mr-2 w-5 h-5 border-2 border-white border-r-transparent rounded-full"></div>Generating Your Perfect Trip...`;
            itGenerateBtn.disabled = true;
        } else {
            itGenerateBtn.innerHTML = `<i data-lucide="sparkles" class="mr-2 h-5 w-5"></i>Generate AI Itinerary`;
            itGenerateBtn.disabled = !itState.formData.duration;
        }
        lucide.createIcons();
    }

    function itRenderItinerary() {
        if (!itItineraryContainer) return;
        if (itState.generatedItinerary) {
            const itinerary = itState.generatedItinerary;
            const daysHTML = itinerary.days.map(day => {
                const activitiesHTML = day.activities.map(activity => `<div class="flex items-start space-x-3 p-3 rounded-lg bg-dark-blue-bg hover:bg-opacity-50 transition-colors"><div class="flex-shrink-0 mt-1"><div class="bg-light-blue-bg p-2 rounded-lg shadow-sm border border-card-border"><i data-lucide="${itGetActivityIconName(activity.type)}" class="h-4 w-4 text-neon-cyan"></i></div></div><div class="flex-1 min-w-0"><div class="flex items-center justify-between mb-1"><h4 class="font-medium text-text-primary-it">${activity.title}</h4><div class="flex items-center text-sm text-text-secondary-it"><i data-lucide="clock" class="mr-1 h-3 w-3"></i>${activity.time}</div></div><p class="text-sm text-text-secondary-it mb-2">${activity.description}</p><div class="flex items-center justify-between"><div class="flex items-center text-xs text-text-secondary-it"><i data-lucide="map-pin" class="mr-1 h-3 w-3"></i>${activity.location}</div></div></div></div>`).join('');
                return `<div class="p-4"><div class="flex items-center mb-4"><div class="bg-neon-cyan text-dark-blue-bg rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold">${day.day}</div><div><h3 class="font-semibold">${day.title}</h3><p class="text-sm text-text-secondary-it">Day ${day.day}</p></div></div><div class="space-y-3">${activitiesHTML}</div></div>`;
            }).join('');
            itItineraryContainer.innerHTML = `<div class="control-block rounded-lg"><div class="p-6 border-b-2 border-neon-cyan"><h2 class="flex items-center text-xl font-semibold"><i data-lucide="check-circle" class="mr-2 h-5 w-5"></i>${itinerary.title}</h2><p class="text-text-secondary-it mt-1">Your personalized itinerary is ready!</p></div><div class="max-h-[80vh] overflow-y-auto">${daysHTML}</div></div>`;
        } else {
            itItineraryContainer.innerHTML = `<div class="control-block border-dashed h-full"><div class="p-12 text-center flex flex-col justify-center items-center h-full"><div class="bg-light-blue-bg border border-card-border rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4"><i data-lucide="sparkles" class="h-10 w-10 text-neon-cyan"></i></div><h3 class="text-lg font-medium text-text-primary-it mb-2">Your AI Itinerary</h3><p class="text-text-secondary-it">Fill out the form to generate your travel plan.</p></div></div>`;
        }
        lucide.createIcons();
    }

    // --- Custom Select Logic (ITINERARY) ---
    function itInitializeCustomSelect(containerId, stateKey) {
        const container = document.getElementById(containerId);
        if (!container) return; // Exit if not found
        const trigger = container.querySelector('.custom-select-trigger span');
        const options = container.querySelectorAll('.custom-option');

        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                trigger.innerHTML = option.innerHTML;
                trigger.style.color = 'var(--text-primary-it)';
                itState.formData[stateKey] = option.getAttribute('data-value');
                if (stateKey === 'duration') { itRenderGenerateButton(); }
                document.activeElement.blur();
            });
        });
    }

    // --- EVENT LISTENERS (ITINERARY) ---
    if (itInterestContainer) {
        itInterestContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.interest-btn');
            if (button && button.dataset.interestId) {
                const interestId = button.dataset.interestId;
                const interestsState = itState.formData.interests;
                const index = interestsState.indexOf(interestId);

                if (index > -1) {
                    interestsState.splice(index, 1);
                    button.classList.remove('selected');
                } else {
                    interestsState.push(interestId);
                    button.classList.add('selected');
                }
            }
        });
    }

    if (itGenerateBtn) {
        itGenerateBtn.addEventListener('click', () => {
            itState.isGenerating = true;
            itRenderGenerateButton();
            setTimeout(() => {
                if (itState.formData.interests.includes('beaches_islands')) { itState.generatedItinerary = itMockItineraries.beaches_islands; }
                else if (itState.formData.interests.includes('adventure_trekking')) { itState.generatedItinerary = itMockItineraries.adventure_trekking; }
                else if (itState.formData.interests.includes('heritage_culture')) { itState.generatedItinerary = itMockItineraries.heritage_culture; }
                else { itState.generatedItinerary = itMockItineraries.default; }
                itState.isGenerating = false;
                itRenderGenerateButton();
                itRenderItinerary();
            }, 2000);
        });
    }

    // =============================================================
    // ===== PAGE SWITCHING & ANIMATION LOGIC (UNCHANGED) =====
    // =============================================================
    const filterRedirectBtn = document.getElementById('filter-redirect-btn');
    const preloader = document.getElementById('preloader');
    const xplorBharatContent = document.getElementById('xplor-bharat-content');
    const itineraryGeneratorContent = document.getElementById('itinerary-generator-content');
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    const homeLink = document.getElementById('home-link');
    const animatableElements = itineraryGeneratorContent.querySelectorAll('.animatable');

    const showHomePage = () => {
        itineraryGeneratorContent.style.display = 'none';
        xplorBharatContent.style.display = 'block';
        window.scrollTo(0, 0);
        animatableElements.forEach(el => el.classList.remove('animate-fade-in'));
    };

    const showItineraryPage = () => {
        preloader.style.display = 'flex';
        setTimeout(() => {
            preloader.style.display = 'none';
            xplorBharatContent.style.display = 'none';
            itineraryGeneratorContent.style.display = 'block';

            // Trigger animation
            animatableElements.forEach((el, index) => {
                el.classList.remove('animate-fade-in');
                void el.offsetWidth;
                setTimeout(() => {
                    el.style.animationDelay = `${index * 0.2}s`;
                    el.classList.add('animate-fade-in');
                }, 50);
            });

            // Initialize the new itinerary content functions
            itInitializeCustomSelect('duration-select-it', 'duration');
            itInitializeCustomSelect('travelType-select-it', 'travelType');
            itInitializeCustomSelect('budget-select-it', 'budget');
            itRenderInterestButtons();
            itRenderGenerateButton();
            itRenderItinerary();


            lucide.createIcons();
            window.scrollTo(0, 0);
        }, 2000);
    };

    filterRedirectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showItineraryPage();
    });

    backToHomeBtn.addEventListener('click', showHomePage);

    homeLink.addEventListener('click', (e) => {
        if (itineraryGeneratorContent.style.display === 'block') {
            e.preventDefault();
            showHomePage();
        }
    });

    // Initial render calls (only run when elements are present, for safety)
    itRenderInterestButtons();
    itRenderGenerateButton();
    itRenderItinerary();
});
