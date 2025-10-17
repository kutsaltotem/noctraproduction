document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');

    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);

        // Update text content based on data-key
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' && element.placeholder) {
                    element.placeholder = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        // Update the flag on the switcher button
        if (languageSwitcher) {
            languageSwitcher.textContent = lang === 'tr' ? '🇺🇸' : '🇹🇷';
        }
    };

    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', (event) => {
            event.preventDefault();
            const currentLang = document.documentElement.lang;
            const newLang = currentLang === 'tr' ? 'en' : 'tr';
            setLanguage(newLang);
        });
    }

    // Initial language detection
    const savedLang = localStorage.getItem('language');
    const browserLang = navigator.language.split('-')[0];
    const langToSet = savedLang || (browserLang === 'tr' ? 'tr' : 'en');
    
    setLanguage(langToSet);
});