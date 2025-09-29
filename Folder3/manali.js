document.addEventListener('DOMContentLoaded', () => {

    // =============================================================
    // ===== 1. TRANSLATIONS & TTS STATE (MANALI PAGE) =========
    // =============================================================

    const ttsState = {
        isPlaying: false,
    };

    const translations = {
        en: {
            manali_language: "Language", // Key for the new dropdown
            manali_brand: "Explore Manali", manali_home: "Home", manali_tts: "Text to Speech", manali_history: "History", manali_places: "Places", manali_activities: "Activities", manali_cuisine: "Cuisine", manali_restaurants: "Restaurants", manali_calculator: "Calculator", manali_hero_title: "Explore Manali", manali_hero_subtitle: "The Valley of Gods", manali_discover_btn: "Discover Now", manali_history_title: "History of Manali",
            manali_history_p1: `Manali, a beautiful hill station in Himachal Pradesh, is known as the "Valley of Gods". According to Hindu mythology, the name "Manali" is derived from 'Manu-Alaya', which translates to 'the abode of Manu'. It is believed that Sage Manu, after the great flood, stepped on this land to recreate human life. This sacred origin gives Manali its spiritual aura and significance.`,
            manali_history_p2: `<br><br>Historically, the region was inhabited by nomadic tribes. Over centuries, it developed into a strategic trade route connecting the Kullu Valley to Ladakh and Central Asia. The British era saw Manali become a popular summer retreat, and its breathtaking landscapes have since drawn travelers, artists, and adventurers from around the globe. Today, it stands as a cultural hub with ancient temples, serene monasteries, and a rich blend of traditional and modern lifestyles.`,
            manali_places_title: "Famous Places to Visit", manali_hadimba_title: "Hadimba Temple", manali_hadimba_desc: "A unique 16th-century wooden temple with a pagoda-style roof, dedicated to Hidimba Devi from the Mahabharata epic.", manali_rohtang_title: "Rohtang Pass", manali_rohtang_desc: "A high-altitude pass famous for breathtaking views of snow-capped peaks and as a gateway to Lahaul and Spiti valleys.", manali_solang_title: "Solang Valley", manali_solang_desc: "A picturesque destination known for stunning landscapes and as a year-round hub for adventure sports like paragliding and skiing.",
            manali_activities_title: "Things to Do in Manali", manali_paragliding_title: "Paragliding in Solang Valley", manali_paragliding_desc: "Soar high above the breathtaking valleys and snowy peaks of Manali for an unforgettable aerial view and adrenaline rush.", manali_rafting_title: "Rafting on the Beas River", manali_rafting_desc: "Experience the thrill of white-water rafting on the Beas River, battling the icy currents surrounded by stunning mountain scenery.", manali_mallroad_title: "Shopping at Mall Road", manali_mallroad_desc: "Stroll, shop, and sample local street food at the bustling Mall Road, the heart of Manali's social and commercial life.", manali_trekking_title: "Trekking to Bhrigu Lake", manali_trekking_desc: "A high-altitude alpine lake trek offering stunning views of the surrounding peaks and meadows, perfect for adventure lovers.", manali_bungee_title: "Bungee Jumping", manali_bungee_desc: "Experience a heart-pounding free fall in Manali, offering a massive adrenaline rush with views of the valley below.", manali_zorbing_title: "Zorbing", manali_zorbing_desc: "Roll down the gentle slopes of Solang Valley inside a giant transparent ball for a fun, thrilling, and unique experience.",
            manali_cuisine_title: "Local Cuisine of Manali", manali_trout_title: "Trout Fish", manali_trout_desc: "Freshly caught and cooked trout fish, a local delicacy of Manali. Served with local spices and herbs.", manali_sidu_title: "Sidu", manali_sidu_desc: "Steamed bread made from wheat dough, served with ghee and lentils. Traditional Himachali dish for festivals.", manali_babru_title: "Babru", manali_babru_desc: "Fried bread stuffed with black gram paste, a popular Himachali snack. Perfect for tea-time cravings.",
            manali_restaurants_title: "Famous Restaurants", manali_johnson_title: "Johnson's Cafe", manali_johnson_desc: "Known for its delicious Trout Fish preparations, Italian food, and cozy garden seating. A popular spot in Old Manali.", manali_cornerhouse_title: "The Corner House", manali_cornerhouse_desc: "A classic Manali restaurant famous for its extensive menu, warm ambiance, and must-try apple crumble.", manali_chopsticks_title: "Chopsticks", manali_chopsticks_desc: "Located on Mall Road, this restaurant specializes in Tibetan, Chinese, and Indian cuisine, perfect for a quick and tasty meal.",
            manali_calculator_title: "Fuel Budget Calculator", manali_calculator_city_placeholder: "Enter your city (e.g., Delhi)", manali_calculator_one_way: "One-Way Trip", manali_calculator_round_trip: "Round Trip", manali_calculator_petrol: "Petrol", manali_calculator_diesel: "Diesel", manali_calculator_cng: "CNG", manali_calculator_mileage_placeholder: "Vehicle Mileage (km/L or km/kg)", manali_calculator_calculate_btn: "Calculate Fuel Budget", manali_footer_text: "© 2025 Explore Manali | Designed for Tourism"
        },
        hi: {
            manali_language: "भाषा", // Key for the new dropdown
            manali_brand: "मनाली का अन्वेषण करें", manali_home: "होम", manali_tts: "टेक्स्ट-टू-स्पीच", manali_history: "इतिहास", manali_places: "स्थान", manali_activities: "गतिविधियाँ", manali_cuisine: "व्यंजन", manali_restaurants: "रेस्टोरेंट", manali_calculator: "कैलकुलेटर", manali_hero_title: "मनाली का अन्वेषण करें", manali_hero_subtitle: "देवताओं की घाटी", manali_discover_btn: "अभी खोजें", manali_history_title: "मनाली का इतिहास",
            manali_history_p1: `मनाली, हिमाचल प्रदेश का एक सुंदर हिल स्टेशन, "देवताओं की घाटी" के रूप में जाना जाता है। हिंदू पौराणिक कथाओं के अनुसार, "मनाली" नाम 'मनु-आलय' से लिया गया है, जिसका अर्थ है 'मनु का निवास'। ऐसा माना जाता है कि महाप्रलय के बाद, ऋषि मनु ने मानव जीवन को फिर से बनाने के लिए इस भूमि पर कदम रखा था। यह पवित्र उत्पत्ति मनाली को इसकी आध्यात्मिक आभा और महत्व देती है।`,
            manali_history_p2: `<br><br>ऐतिहासिक रूप से, इस क्षेत्र में खानाबदोश जनजातियाँ रहती थीं। सदियों से, यह कुल्लू घाटी को लद्दाख और मध्य एशिया से जोड़ने वाला एक रणनीतिक व्यापार मार्ग बन गया। ब्रिटिश काल में मनाली एक लोकप्रिय ग्रीष्मकालीन विश्राम स्थल बन गया, और इसके लुभावने परिदृश्यों ने दुनिया भर के यात्रियों, कलाकारों और साहसी लोगों को आकर्षित किया है। आज, यह प्राचीन मंदिरों, शांत मठों और पारंपरिक और आधुनिक जीवन शैली के समृद्ध मिश्रण के साथ एक सांस्कृतिक केंद्र के रूप में खड़ा है।`,
            manali_places_title: "घूमने के लिए प्रसिद्ध स्थान", manali_hadimba_title: "हिडिम्बा मंदिर", manali_hadimba_desc: "एक अद्वितीय 16वीं सदी का लकड़ी का मंदिर जिसमें शिवालय शैली की छत है, जो महाभारत महाकाव्य से हिडिम्बा देवी को समर्पित है।", manali_rohtang_title: "रोहतांग दर्रा", manali_rohtang_desc: "बर्फ से ढकी चोटियों के लुभावने दृश्यों और लाहौल और स्पीति घाटियों के प्रवेश द्वार के रूप में प्रसिद्ध एक उच्च ऊंचाई वाला दर्रा।", manali_solang_title: "सोलंग घाटी", manali_solang_desc: "शानदार परिदृश्यों और पैराग्लाइडिंग और स्कीइंग जैसे साहसिक खेलों के लिए साल भर के केंद्र के रूप में जाना जाने वाला एक सुरम्य गंतव्य।",
            manali_activities_title: "मनाली में करने योग्य चीज़ें", manali_paragliding_title: "सोलंग घाटी में पैराग्लाइडिंग", manali_paragliding_desc: "एक अविस्मरणीय हवाई दृश्य और एड्रेनालाईन रश के लिए मनाली की लुभावनी घाटियों और बर्फीली चोटियों के ऊपर ऊंची उड़ान भरें।", manali_rafting_title: "ब्यास नदी पर राफ्टिंग", manali_rafting_desc: "शानदार पहाड़ी दृश्यों से घिरी ब्यास नदी पर व्हाइट-वाटर राफ्टिंग के रोमांच का अनुभव करें, बर्फीली धाराओं का मुकाबला करें।", manali_mallroad_title: "मॉल रोड पर खरीदारी", manali_mallroad_desc: "मनाली के सामाजिक और व्यावसायिक जीवन के केंद्र, हलचल भरे मॉल रोड पर घूमें, खरीदारी करें और स्थानीय स्ट्रीट फूड का स्वाद चखें।", manali_trekking_title: "भृगु झील तक ट्रेकिंग", manali_trekking_desc: "आसपास की चोटियों और घास के मैदानों के शानदार दृश्य प्रस्तुत करने वाला एक उच्च ऊंचाई वाला अल्पाइन झील ट्रेक, जो साहसिक प्रेमियों के लिए एकदम सही है।", manali_bungee_title: "बंजी जंपिंग", manali_bungee_desc: "मनाली में दिल दहला देने वाली फ्री-फॉल का अनुभव करें, जो नीचे की घाटी के दृश्यों के साथ एक विशाल एड्रेनालाईन रश प्रदान करता है।", manali_zorbing_title: "ज़ोरबिंग", manali_zorbing_desc: "एक मजेदार, रोमांचकारी और अनोखे अनुभव के लिए एक विशाल पारदर्शी गेंद के अंदर सोलंग घाटी की कोमल ढलानों से नीचे लुढ़कें।",
            manali_cuisine_title: "मनाली का स्थानीय व्यंजन", manali_trout_title: "ट्राउट मछली", manali_trout_desc: "ताज़ी पकड़ी और पकाई गई ट्राउट मछली, मनाली का एक स्थानीय व्यंजन। स्थानीय मसालों और जड़ी-बूटियों के साथ परोसा जाता है।", manali_sidu_title: "सिदू", manali_sidu_desc: "गेहूं के आटे से बनी भाप में पकाई गई रोटी, घी और दाल के साथ परोसी जाती है। त्योहारों के लिए पारंपरिक हिमाचली व्यंजन।", manali_babru_title: "बाबरू", manali_babru_desc: "काले चने की दाल से भरी तली हुई रोटी, एक लोकप्रिय हिमाचली नाश्ता। चाय के समय की लालसा के लिए बिल्कुल सही।",
            manali_restaurants_title: "प्रसिद्ध रेस्टोरेंट", manali_johnson_title: "जॉनसन कैफे", manali_johnson_desc: "अपने स्वादिष्ट ट्राउट मछली की तैयारी, इतालवी भोजन और आरामदायक बगीचे में बैठने के लिए जाना जाता है। पुराने मनाली में एक लोकप्रिय स्थान।", manali_cornerhouse_title: "द कॉर्नर हाउस", manali_cornerhouse_desc: "एक क्लासिक मनाली रेस्टोरेंट जो अपने विस्तृत मेनू, गर्म माहौल और अवश्य आजमाए जाने वाले एप्पल क्रम्बल के लिए प्रसिद्ध है।", manali_chopsticks_title: "चॉपस्टिक्स", manali_chopsticks_desc: "मॉल रोड पर स्थित, यह रेस्टोरेंट तिब्बती, चीनी और भारतीय व्यंजनों में माहिर है, जो एक त्वरित और स्वादिष्ट भोजन के लिए एकदम सही है।",
            manali_calculator_title: "ईंधन बजट कैलकुलेटर", manali_calculator_city_placeholder: "अपना शहर दर्ज करें (उदा., दिल्ली)", manali_calculator_one_way: "एक तरफा यात्रा", manali_calculator_round_trip: "राउंड ट्रिप", manali_calculator_petrol: "पेट्रोल", manali_calculator_diesel: "डीजल", manali_calculator_cng: "सीएनजी", manali_calculator_mileage_placeholder: "वाहन माइलेज (किमी/लीटर या किमी/किग्रा)", manali_calculator_calculate_btn: "ईंधन बजट की गणना करें", manali_footer_text: "© 2025 एक्सप्लोर मनाली | पर्यटन के लिए डिज़ाइन किया गया"
        },
        // Marathi and Spanish would be here
    };


    // =============================================================
    // ===== 2. CORE FUNCTIONS (LANGUAGE & TTS) ====================
    // =============================================================

    const setLanguage = (lang) => {
        if (!translations[lang]) lang = 'en'; // Fallback to English

        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang]?.[key]) {
                 el.innerHTML = translations[lang][key];
            }
        });
        localStorage.setItem('manali-language', lang);
    };

    const toggleTextToSpeech = () => {
        if (ttsState.isPlaying) {
            window.speechSynthesis.cancel();
            return;
        }

        let textToSpeak = '';
        document.querySelectorAll('[data-translate]').forEach(el => {
            textToSpeak += el.innerText.replace(/<br\s*[\/]?>/gi, " ") + '. ';
        });

        if (textToSpeak) {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            const lang = localStorage.getItem('manali-language') || 'en';
            
            const langVoiceMap = {
                'hi': 'hi-IN', 'mr': 'mr-IN', 'es': 'es-ES', 'en': 'en-US'
            };
            utterance.lang = langVoiceMap[lang] || 'en-US';

            utterance.onstart = () => { ttsState.isPlaying = true; };
            utterance.onend = () => { ttsState.isPlaying = false; };
            utterance.onerror = () => {
                ttsState.isPlaying = false;
                console.error("Speech synthesis error.");
            };
            
            window.speechSynthesis.speak(utterance);
        }
    };


    // =============================================================
    // ===== 3. PAGE INITIALIZATION & EVENT LISTENERS ==============
    // =============================================================

    // --- Language Initialization ---
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang') || localStorage.getItem('manali-language') || 'en';
    setLanguage(langFromUrl);

    // --- NEW: Language Switcher Event Listeners ---
    document.querySelectorAll('.lang-switcher').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedLang = event.currentTarget.getAttribute('data-lang');
            setLanguage(selectedLang);
        });
    });

    // --- TTS Button Event Listener ---
    document.getElementById('text-to-speech-btn').addEventListener('click', (e) => {
        e.preventDefault();
        toggleTextToSpeech();
    });

    // --- THEME TOGGLE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.getElementById('body');
    const themeIcon = themeToggleBtn.querySelector('i');
    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('manali-theme') || 'dark';
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
    applySavedTheme();

    // --- CUSTOM DROPDOWNS ---
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
        const distances = { "delhi": 501, "chandigarh": 269, "shimla": 239, "mumbai": 1901, "kolkata": 2041, "bangalore": 2660, "patna": 1563 };
        const fuelPrices = { "petrol": 95.00, "diesel": 88.00, "cng": 76.00 };
        if (!cityInput || isNaN(mileage) || mileage <= 0) {
            resultContent.innerHTML = `<p style="color:red; text-align:center;">Please fill in all the details correctly.</p>`;
            resultContainer.classList.add('visible'); return;
        }
        const distance = distances[cityInput];
        if (!distance) {
            resultContent.innerHTML = `<p style="color:red; text-align:center;">Distance not available. Try Delhi, Chandigarh, Shimla, etc.</p>`;
            resultContainer.classList.add('visible'); return;
        }
        const fuelPrice = fuelPrices[fuelType];
        let totalDistance = (tripType === "round-trip") ? distance * 2 : distance;
        const fuelNeeded = totalDistance / mileage;
        const estimatedBudget = fuelNeeded * fuelPrice;
        const resultHTML = `<h3>Trip Details:</h3><p><strong>City:</strong> ${cityInput.charAt(0).toUpperCase() + cityInput.slice(1)}</p><p><strong>Trip Type:</strong> ${tripType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p><p><strong>Fuel Type:</strong> ${fuelType.charAt(0).toUpperCase() + fuelType.slice(1)}</p><p><strong>Total Distance:</strong> ${totalDistance} km</p><hr style="border-color: rgba(255,255,255,0.1); margin: 15px 0;"><p style="font-size: 1.5rem; font-weight: bold;">Estimated Fuel Budget: ₹${estimatedBudget.toFixed(2)}</p>`;
        resultContent.innerHTML = resultHTML;
        resultContainer.classList.add('visible');
    });

    // --- CARD ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -100px 0px', threshold: 0 });
    document.querySelectorAll('.card, .cuisine-card').forEach((card, index) => {
        setTimeout(() => observer.observe(card), index * 150);
    });
});
