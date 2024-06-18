window.addEventListener('DOMContentLoaded', event => {

    // Funkcja zmiany języka strony na podstawie wyboru flagi
    function setLanguageBasedOnSelection(language) {
        loadLanguage(language);
        updateSelectedLanguageIcon(language);
    }

    // Funkcja aktualizacji wybranej ikony języka
    function updateSelectedLanguageIcon(language) {
        document.querySelectorAll('.language-selector img').forEach(img => {
            img.classList.remove('selected');
        });
        if (language === 'en') {
            document.getElementById('lang-en').classList.add('selected');
        } else {
            document.getElementById('lang-pl').classList.add('selected');
        }
    }

    // Dodanie nasłuchiwania na kliknięcie flagi
    document.getElementById('lang-en').addEventListener('click', () => setLanguageBasedOnSelection('en'));
    document.getElementById('lang-pl').addEventListener('click', () => setLanguageBasedOnSelection('pl'));

    // Inne istniejące funkcje
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }
    };

    navbarShrink();
    document.addEventListener('scroll', navbarShrink);

    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Inicjalizacja języka na podstawie domyślnego lub zapisanego w localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    updateSelectedLanguageIcon(savedLanguage);
    loadLanguage(savedLanguage);
});

// Funkcja zmiany języka strony na podstawie kraju
function setLanguageBasedOnCountry(country) {
    const language = (country === 'Polska') ? 'pl' : 'en';
    loadLanguage(language);
}

// Funkcja załadowania języka
function loadLanguage(lang) {
    fetch(`locales/${lang}.json`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(translations => {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            el.textContent = translations[key] || "Missing translation";
        });
        localStorage.setItem('selectedLanguage', lang); // Zapisz wybrany język w localStorage
    })
    .catch(error => {
        console.error('Error loading the translation file:', error);
    });
}

