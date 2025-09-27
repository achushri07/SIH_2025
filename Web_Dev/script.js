document.addEventListener("DOMContentLoaded", () => {
    let selectedFestival = null;
    let selectedHoliday = null;
    let selectedRating = 0;
    let isSpeaking = false;

    // --- MULTILINGUAL FEATURE ---
    const translations = {
        en: {
            nav_home: 'Home',
            nav_features: 'Features',
            nav_ai_planner: 'AI Planner',
            nav_tts: 'Text to Speech',
            nav_explore: 'Explore',
            nav_top_destinations: 'Top destinations',
            nav_indian_delicacy: 'Indian Delicacy',
            nav_filter: 'Filter',
            nav_language: 'Language',
            hero_quote: 'Discover Beautiful Destinations',
            search_placeholder: '🔍 Enter destination city...',
            plan_trip_btn: '✈️ Plan Your Trip',
            filter_duration: 'Duration',
            filter_to: 'to',
            filter_festive: 'Festive Season',
            filter_holiday: 'Holiday',
            filter_yes: 'Yes',
            filter_no: 'No',
            filter_rating: 'Hotel Rating',
            get_predictions_btn: '🔮 Get Predictions',
            // ... (add all other English translations)
        },
        hi: {
            nav_home: 'होम',
            nav_features: 'विशेषताएँ',
            nav_ai_planner: 'एआई प्लानर',
            nav_tts: 'टेक्स्ट टू स्पीच',
            nav_explore: 'अन्वेषण करें',
            nav_top_destinations: 'शीर्ष गंतव्य',
            nav_indian_delicacy: 'भारतीय व्यंजन',
            nav_filter: 'फ़िल्टर',
            nav_language: 'भाषा',
            hero_quote: 'सुंदर स्थलों की खोज करें',
            search_placeholder: '🔍 गंतव्य शहर दर्ज करें...',
            plan_trip_btn: '✈️ अपनी यात्रा की योजना बनाएं',
            filter_duration: 'अवधि',
            filter_to: 'तक',
            filter_festive: 'त्योहार का मौसम',
            filter_holiday: 'छुट्टी',
            filter_yes: 'हाँ',
            filter_no: 'नहीं',
            filter_rating: 'होटल रेटिंग',
            get_predictions_btn: '🔮 भविष्यवाणियाँ प्राप्त करें',
             // ... (add all other Hindi translations)
        },
        mr: {
            nav_home: 'मुख्यपृष्ठ',
            nav_features: 'वैशिष्ट्ये',
            nav_ai_planner: 'एआय प्लॅनर',
            nav_tts: 'टेक्स्ट टू स्पीच',
            nav_explore: 'अन्वेषण करा',
            nav_top_destinations: 'शीर्ष गंतव्ये',
            nav_indian_delicacy: 'भारतीय स्वादिष्ट पदार्थ',
            nav_filter: 'फिल्टर',
            nav_language: 'भाषा',
            hero_quote: 'सुंदर स्थळांचा शोध घ्या',
            search_placeholder: '🔍 गंतव्य शहर प्रविष्ट करा...',
            plan_trip_btn: '✈️ आपल्या सहलीची योजना करा',
            filter_duration: 'कालावधी',
            filter_to: 'पर्यंत',
            filter_festive: 'सणासुदीचा हंगाम',
            filter_holiday: 'सुट्टी',
            filter_yes: 'होय',
            filter_no: 'नाही',
            filter_rating: 'हॉटेल रेटिंग',
            get_predictions_btn: '🔮 अंदाज मिळवा',
             // ... (add all other Marathi translations)
        },
        es: {
            nav_home: 'Inicio',
            nav_features: 'Características',
            nav_ai_planner: 'Planificador de IA',
            nav_tts: 'Texto a voz',
            nav_explore: 'Explorar',
            nav_top_destinations: 'Mejores destinos',
            nav_indian_delicacy: 'Delicadeza india',
            nav_filter: 'Filtro',
            nav_language: 'Idioma',
            hero_quote: 'Descubre Destinos Hermosos',
            search_placeholder: '🔍 Ingrese la ciudad de destino...',
            plan_trip_btn: '✈️ Planifica Tu Viaje',
            filter_duration: 'Duración',
            filter_to: 'a',
            filter_festive: 'Temporada festiva',
            filter_holiday: 'Feriado',
            filter_yes: 'Sí',
            filter_no: 'No',
            filter_rating: 'Calificación del hotel',
            get_predictions_btn: '🔮 Obtener Predicciones',
             // ... (add all other Spanish translations)
        }
    };

    const setLanguage = (lang) => {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (element.placeholder) {
                    element.placeholder = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });
        localStorage.setItem('language', lang); // Save language choice
    };

    document.querySelectorAll('.lang-switcher').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedLang = event.target.getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });

    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    // --- TEXT-TO-SPEECH (TTS) FEATURE ---
    const ttsButton = document.getElementById('text-to-speech-btn');
    ttsButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            isSpeaking = false;
        } else {
            let textToSpeak = '';
            document.querySelectorAll('[data-translate]').forEach(el => {
                textToSpeak += el.innerText + '. ';
            });
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = localStorage.getItem('language') || 'en';
            utterance.onend = () => {
                isSpeaking = false;
            };
            window.speechSynthesis.speak(utterance);
            isSpeaking = true;
        }
    });

    // --- THEME TOGGLE ---
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

    // --- CHATBOT FUNCTIONALITY ---
    const chatBtn = document.getElementById("chatbot-btn");
    const chatPop = document.getElementById("chatbot-popup");
    const closeChatbotBtn = document.getElementById("close-chatbot");
    const sendChatBtn = document.getElementById("chatbot-send-btn");
    const chatInputField = document.getElementById("chatbot-input-field");
    const chatMessages = document.getElementById("chatbot-messages");
    const aiPlannerBtn = document.getElementById("ai-planner-btn"); // Get AI Planner button

    const toggleChatbot = () => {
        const isVisible = chatPop.style.display === "flex";
        chatPop.style.display = isVisible ? "none" : "flex";
    };

    chatBtn.addEventListener("click", toggleChatbot);
    closeChatbotBtn.addEventListener("click", toggleChatbot);
    
    // Event listener for AI Planner button to open chatbot
    aiPlannerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleChatbot();
    });

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

    // --- HERO SLIDER ---
    const heroBgs = document.querySelectorAll(".hero-bg");
    const heroQuote = document.getElementById("hero-quote");
    const quotes = {
        en: ["Discover Beautiful Destinations", "Explore the Wonders of India", "Adventure Awaits You", "Taste Local Cuisines"],
        hi: ["सुंदर स्थलों की खोज करें", "भारत के अजूबों को खोजें", "साहसिक कार्य आपको बुला रहा है", "स्थानीय व्यंजनों का स्वाद लें"],
        mr: ["सुंदर स्थळांचा शोध घ्या", "भारताच्या आश्चर्यांचा शोध घ्या", "साहस तुमची वाट पाहत आहे", "स्थानिक पदार्थांची चव घ्या"],
        es: ["Descubre Destinos Hermosos", "Explora las Maravillas de la India", "La Aventura te Espera", "Prueba las Cocinas Locales"]
    };

    let index = 0;

    function nextHero() {
        if (heroBgs.length === 0) return;
        heroBgs.forEach(bg => bg.classList.remove("active"));
        heroBgs[index].classList.add("active");

        const currentLang = localStorage.getItem('language') || 'en';
        const currentQuotes = quotes[currentLang];

        heroQuote.style.opacity = 0;
        setTimeout(() => {
            heroQuote.textContent = currentQuotes[index];
            heroQuote.style.opacity = 1;
        }, 500);
        index = (index + 1) % heroBgs.length;
    }
    nextHero();
    setInterval(nextHero, 4000);
    
    // --- SCROLL REVEAL ---
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

    // --- STAR RATING ---
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

    // --- FILTER CONTROLS ---
    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        const valueSpan = dropdown.querySelector('.selected-value');
        if (!valueSpan) return;
        dropdown.querySelectorAll('.option-yn').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedValue = option.getAttribute('data-value');
                const dataType = option.getAttribute('data-type');

                const currentLang = localStorage.getItem('language') || 'en';
                const translatedYes = translations[currentLang]['filter_yes'];
                const translatedNo = translations[currentLang]['filter_no'];

                valueSpan.textContent = `: ${selectedValue === 'Yes' ? translatedYes : translatedNo}`;

                if (dataType === 'festival') selectedFestival = selectedValue;
                else if (dataType === 'holiday') selectedHoliday = selectedValue;
            });
        });
    });

    // --- PREDICTION LOGIC ---
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
