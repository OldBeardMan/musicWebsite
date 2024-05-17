// Dodaje nasłuchiwanie na zdarzenie załadowania zawartości strony (funkcje aktywują się przy załadowaniu strony)
window.addEventListener('DOMContentLoaded', event => {

    // Definicja funkcji do zmniejszenia paska nawigacji
    var navbarShrink = function () {
        // Szuka elementu o identyfikatorze 'mainNav' w dokumencie
        const navbarCollapsible = document.body.querySelector('#mainNav');
        // Jeżeli nie znajdzie elementu, funkcja zakończy działanie
        if (!navbarCollapsible) {
            return;
        }
        // Jeżeli strona jest przewinięta na samą górę, usuwa klasę zmniejszającą pasek nawigacyjny
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            // W przeciwnym przypadku dodaje klasę zmniejszającą pasek nawigacyjny
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Wywołuje funkcję zmniejszenia paska nawigacji
    navbarShrink();

    // Dodaje nasłuchiwanie na przewijanie strony, aby uruchomić funkcję zmniejszenia paska
    document.addEventListener('scroll', navbarShrink);

    // Aktywacja szpiegowania przewijania strony przez komponent Bootstrap
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Szuka przycisku do rozwijania menu w trybie responsywnym
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    // Zbiera wszystkie linki w rozwijanym menu
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    // Dodaje nasłuchiwanie na kliknięcie dla każdego linku w menu responsywnym
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            // Jeżeli menu jest rozwinięte, zwiń je po kliknięciu w link
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Odczytywanie geolokalizacji i ustalanie języka na podstawie kraju
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => { //sprawdzenie aktualnej pozycji użytkownija
            const { latitude, longitude } = position.coords; //zczytanie koordynacji
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA3cH-xDSjsL38hxB9apy_rHUbkr5vEJRU`) //wrzucenie koordynacji do google api (wygenerowałem darmowy klucz)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) { //jeżeli odpowiedź większa niż zero
                    const country = data.results[0].address_components.find(comp => comp.types.includes("country")).long_name; //znalezienie kraju o danych koordyancjach przez google api
                    setLanguageBasedOnCountry(country); //wywołanie funkcji ustawienia języka w zależności od kraju (linijka 74)
                } else {
                    throw new Error('No results found in the geolocation response.'); //jeżeli nie znaleziono kraju w odpowiedzi geolokalizacji, wyrzuć błąd
                }
            })
            .catch(error => {
                console.error('Failed to retrieve location or country:', error); //jezeli złapało error ze znalezieniem kraju
                setLanguageBasedOnCountry('default'); // Użyj domyślnego języka w przypadku błędu (en)
            });
        }, error => {
            console.error('Geolocation error:', error); //jeżeli error geolokalizacji
            setLanguageBasedOnCountry('default'); // użyj podstawowego języka (en)
        });
    } else {
        console.error('Geolocation is not supported by this browser.'); //jeżeli geolokalizacja nie jest wspomagana
        setLanguageBasedOnCountry('default'); // domyślny język (en)
    }
});

// Funkcja zmiany języka strony na podstawie kraju
function setLanguageBasedOnCountry(country) {
    const language = (country === 'Polska') ? 'pl' : 'en'; //sprawdzenie czy geolokalizacja zwraca country Polska, jeśli tak to ustawe language jako pl, jak nie to en
    loadLanguage(language); //wywowałnie funkcji ustawienia języka
}

// Funkcja załadowania języka
function loadLanguage(lang) {
    fetch(`locales/${lang}.json`) //załadowanie pliku o nazwie skrótu języka (albo pl albo en z funkcji wyżej)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok'); //sprawdzenie czy jest odpowiedź z sieci, jeśli nie to wyrzuca error
        }
        return response.json();
    })
    .then(translations => {
        document.querySelectorAll('[data-translate]').forEach(el => { //zbiera wszystkie atrybuty data-translate z plików html
            const key = el.getAttribute('data-translate'); //patrzy na klucze w pliku json i przyrównuje ich do ustawionych atrybutów data-translate w pliku html
            el.textContent = translations[key] || "Missing translation"; //ustawienie tłumaczenia danego wpisu o danym kluczu, wyrzucenie napisu Missing translations, jeżeli klucza nie znaleziono
        });
    })
    .catch(error => {
        console.error('Error loading the translation file:', error); //błąd ładowania pliku z tłumaczenie wyświetlany w konsoli
    });
}

//formularz
document.getElementById('contactForm').addEventListener('submit', function(event) { //bierz element o ID contactform i nasłuchuj czy kliknięto submit
    event.preventDefault(); //funkcja która przerywa domyślne ekcje związane z przyciskiem submit
    const form = this;

    // Zbieranie danych z formularza
    const formData = {
        name: form.name.value, //pobranie imienia
        email: form.email.value, //pobranie maila
        message: form.message.value, //pobranie treści wiadomości
        ageRange: form.querySelector('input[name="ageRange"]:checked') ? form.querySelector('input[name="ageRange"]:checked').value : '', //pobranie wieku przez funkcję querySelector (bo wiek w przycisku typu radio)
        country: form.country.value, //pobranie kraju pochodzenia
        favoriteAlbums: Array.from(form['favoriteAlbum[]']).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value) //pobranie ulubionych albumów i przerobienie ich w tablicę
    };

    // Zapisywanie danych do localStorage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Wyświetlanie komunikatu o sukcesie i resetowanie formularza
    alert('Your message has been saved successfully!');
    form.reset();
});
