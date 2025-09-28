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
    // ===== MODIFIED getPredictions FUNCTION WITH REDIRECT LOGIC =====
    // =============================================================
    const getPredictions = () => {
        const destination = document.getElementById('destination-input').value.toLowerCase().trim();

        // 1. Check for "manali" input
        if (destination === 'manali') {
            const splashScreen = document.getElementById('manali-splash-logo');
            splashScreen.style.display = 'flex';
            // Force reflow to ensure the opacity transition works
            void splashScreen.offsetWidth;
            splashScreen.classList.add('show');

            // 2. Set timeout for 3000ms (3 seconds) before redirecting
            setTimeout(() => {
                // 3. Redirect to the Manali site (assuming the second HTML snippet is saved as this file)
                window.location.href = 'manali-site.html';
            }, 3000);

            // Stop normal prediction flow
            return;
        }

        // Normal prediction logic for other inputs
        if (!document.getElementById('destination-input').value.trim() || !selectedFestival || !selectedHoliday || selectedRating === 0) {
            alert('Please fill in all fields: Destination, Festive Season, Holiday, and Hotel Rating.');
            return;
        }
        alert(`Getting predictions for: ${destination.charAt(0).toUpperCase() + destination.slice(1)}...`);
    };

    document.getElementById('prediction-btn').addEventListener('click', getPredictions);
    document.getElementById('plan-trip-btn').addEventListener('click', getPredictions);


    // =============================================================
    // ===== SCRIPT FOR AI ITINERARY GENERATOR (Logic restored) =====
    // =============================================================

    const state = { formData: { duration: '', interests: [], travelType: '', budget: '' }, generatedItinerary: null, isGenerating: false };
    const interestsData = [{ id: 'waterfalls', label: 'Waterfalls', icon: 'waves' }, { id: 'wildlife', label: 'Wildlife', icon: 'trees' }, { id: 'culture', label: 'Tribal Culture', icon: 'users' }, { id: 'adventure', label: 'Adventure Sports', icon: 'mountain' }, { id: 'photography', label: 'Photography', icon: 'camera' }, { id: 'nature', label: 'Nature Walks', icon: 'leaf' }];
    const mockItineraries = { '2-3': { title: "Weekend Waterfall Escape", days: [{ day: 1, title: "Arrival & Dassam Falls", activities: [{ time: "9:00 AM", title: "Arrive in Ranchi", description: "Check into eco-friendly homestay near Dassam Falls", location: "Ranchi", type: "transport", ecoFriendly: true }, { time: "11:00 AM", title: "Dassam Falls Exploration", description: "Trek to the spectacular 44-feet waterfall, enjoy photography and natural pools", location: "Dassam Falls", type: "attraction", ecoFriendly: true }, { time: "2:00 PM", title: "Local Tribal Lunch", description: "Traditional Santali cuisine at local homestay with cultural performance", location: "Tribal Village", type: "food", ecoFriendly: true }, { time: "6:00 PM", title: "Sunset at Tagore Hill", description: "Panoramic views of Ranchi city and surrounding forests", location: "Tagore Hill", type: "viewpoint", ecoFriendly: false }] }, { day: 2, title: "Hundru Falls & Tribal Culture", activities: [{ time: "7:00 AM", title: "Journey to Hundru Falls", description: "Early morning drive to Jharkhand's highest waterfall (322 feet)", location: "Hundru Falls", type: "transport", ecoFriendly: true }, { time: "9:00 AM", title: "Hundru Falls Trek", description: "Challenging trek with breathtaking views and natural swimming spots", location: "Hundru Falls", type: "attraction", ecoFriendly: true }, { time: "1:00 PM", title: "Tribal Craft Workshop", description: "Learn Dokra metal craft techniques from local artisans", location: "Craft Village", type: "cultural", ecoFriendly: true }, { time: "4:00 PM", title: "Departure", description: "Return journey with memories and handcrafted souvenirs", location: "Ranchi", type: "transport", ecoFriendly: false }] }] }, '4-5': { title: "Complete Jharkhand Explorer", days: [{ day: 1, title: "Ranchi Arrival & Local Sights", activities: [{ time: "10:00 AM", title: "Arrive & City Tour", description: "Check-in and explore Ranchi's historical sites and markets", location: "Ranchi", type: "transport", ecoFriendly: true }, { time: "2:00 PM", title: "Dassam Falls", description: "First waterfall experience with local guide stories", location: "Dassam Falls", type: "attraction", ecoFriendly: true }] }, { day: 2, title: "Netarhat Hill Station", activities: [{ time: "6:00 AM", title: "Journey to Netarhat", description: "Scenic drive to the 'Queen of Chotanagpur' hill station", location: "Netarhat", type: "transport", ecoFriendly: true }, { time: "8:00 AM", title: "Sunrise Point", description: "Witness spectacular sunrise views over the Chotanagpur plateau", location: "Netarhat Sunrise Point", type: "viewpoint", ecoFriendly: true }] }, { day: 3, title: "Betla National Park Safari", activities: [{ time: "5:00 AM", title: "Wildlife Safari", description: "Early morning safari to spot tigers, elephants, and diverse birdlife", location: "Betla National Park", type: "wildlife", ecoFriendly: true }] }, { day: 4, title: "Cultural Immersion Day", activities: [{ time: "9:00 AM", title: "Tribal Village Visit", description: "Experience authentic Santali and Munda tribal lifestyle", location: "Traditional Village", type: "cultural", ecoFriendly: true }] }] } };
    const getActivityIconName = type => ({ transport: 'car', attraction: 'map-pin', food: 'home', cultural: 'users', wildlife: 'trees', viewpoint: 'mountain' }[type] || 'map-pin');
    const durationSelect = document.getElementById('duration'), travelTypeSelect = document.getElementById('travelType'), budgetSelect = document.getElementById('budget'), generateBtn = document.getElementById('generate-btn'), interestContainer = document.getElementById('interest-buttons-container'), itineraryContainer = document.getElementById('itinerary-container');
    const renderInterestButtons = () => { interestContainer.innerHTML = interestsData.map(i => `<button data-interest-id="${i.id}" class="justify-start h-auto p-3 text-left w-full flex items-center border rounded-md transition-colors ${state.formData.interests.includes(i.id) ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-white border-gray-300 hover:bg-emerald-50'}"><i data-lucide="${i.icon}" class="mr-2 h-4 w-4"></i><span class="text-sm">${i.label}</span></button>`).join(''); lucide.createIcons(); };
    const renderGenerateButton = () => { if (state.isGenerating) { generateBtn.innerHTML = `<div class="spinner mr-2"></div> Generating...`; generateBtn.disabled = true; } else { generateBtn.innerHTML = `<i data-lucide="sparkles" class="mr-2 h-4 w-4"></i> Generate AI Itinerary`; generateBtn.disabled = !state.formData.duration; } lucide.createIcons(); };
    const renderItinerary = () => { if (state.generatedItinerary) { const itinerary = state.generatedItinerary; const daysHTML = itinerary.days.map(d => { const actHTML = d.activities.map(a => { const ecoBadge = a.ecoFriendly ? `<div class="flex items-center text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full"><i data-lucide="leaf" class="mr-1 h-3 w-3"></i> Eco-Friendly</div>` : ''; return `<div class="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-emerald-50 transition-colors"><div class="flex-shrink-0 mt-1"><div class="bg-white p-2 rounded-lg shadow-sm"><i data-lucide="${getActivityIconName(a.type)}" class="h-4 w-4 text-emerald-600"></i></div></div><div class="flex-1 min-w-0"><div class="flex items-center justify-between mb-1"><h4 class="font-medium text-gray-900">${a.title}</h4><div class="flex items-center text-sm text-gray-500"><i data-lucide="clock" class="mr-1 h-3 w-3"></i> ${a.time}</div></div><p class="text-sm text-gray-600 mb-2">${a.description}</p><div class="flex items-center justify-between"><div class="flex items-center text-xs text-gray-500"><i data-lucide="map-pin" class="mr-1 h-3 w-3"></i> ${a.location}</div>${ecoBadge}</div></div></div>`; }).join(''); return `<div class="p-6 border-b border-gray-100 last:border-b-0"><div class="flex items-center mb-4"><div class="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold">${d.day}</div><div><h3 class="font-semibold text-emerald-800">${d.title}</h3><p class="text-sm text-gray-600">Day ${d.day}</p></div></div><div class="space-y-3">${actHTML}</div></div>`; }).join(''); itineraryContainer.innerHTML = `<div class="bg-white shadow-xl border-0 rounded-lg"><div class="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg p-6"><h2 class="flex items-center text-xl font-semibold"><i data-lucide="check-circle" class="mr-2 h-5 w-5"></i> ${itinerary.title}</h2><p class="text-green-100 mt-1">Your personalized itinerary is ready!</p></div><div class="max-h-[600px] overflow-y-auto">${daysHTML}<div class="p-6 bg-gray-50 rounded-b-lg"><div class="flex flex-col sm:flex-row gap-3"><button class="flex-1 justify-center p-3 text-white bg-emerald-600 hover:bg-emerald-700 rounded-md flex items-center"><i data-lucide="calendar" class="mr-2 h-4 w-4"></i> Save Itinerary</button><button class="flex-1 justify-center p-3 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-md flex items-center">Share with Friends</button></div></div></div></div>`; } else { itineraryContainer.innerHTML = `<div class="bg-white shadow-xl border-0 border-dashed border-emerald-300 rounded-lg"><div class="p-12 text-center"><div class="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"><i data-lucide="sparkles" class="h-8 w-8 text-emerald-600"></i></div><h3 class="text-lg font-medium text-emerald-800 mb-2">Your AI Itinerary</h3><p class="text-gray-600">Fill out the form to generate your personalized travel plan</p></div></div>`; } lucide.createIcons(); };
    durationSelect.addEventListener('change', e => { state.formData.duration = e.target.value; renderGenerateButton(); });
    travelTypeSelect.addEventListener('change', e => { state.formData.travelType = e.target.value; });
    budgetSelect.addEventListener('change', e => { state.formData.budget = e.target.value; });
    interestContainer.addEventListener('click', e => { const btn = e.target.closest('button'); if (btn?.dataset.interestId) { const id = btn.dataset.interestId; const interests = state.formData.interests; if (interests.includes(id)) state.formData.interests = interests.filter(i => i !== id); else interests.push(id); renderInterestButtons(); } });
    generateBtn.addEventListener('click', () => { state.isGenerating = true; renderGenerateButton(); setTimeout(() => { state.generatedItinerary = mockItineraries[state.formData.duration] || mockItineraries['2-3']; state.isGenerating = false; renderGenerateButton(); renderItinerary(); }, 2000); });
    renderInterestButtons(); renderGenerateButton(); renderItinerary();

    // =============================================================
    // ===== PAGE SWITCHING & ANIMATION LOGIC (Restored) =====
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

            lucide.createIcons();
            window.scrollTo(0, 0);
        }, 2000);
    };

    // This is the restored logic for the 'Filter' button
    filterRedirectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showItineraryPage();
    });
    // End restored logic

    backToHomeBtn.addEventListener('click', showHomePage);

    homeLink.addEventListener('click', (e) => {
        if (itineraryGeneratorContent.style.display === 'block') {
            e.preventDefault();
            showHomePage();
        }
    });
});
