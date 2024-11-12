let countries = [];
let displayedCountries = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const countriesPerPage = 10;
let currentPage = 0;

async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    countries = await response.json();
    renderCountries();
    renderFavorites();
}

fetchCountries();

function renderCountries(filteredCountries = countries) {
    const countryList = document.getElementById('country-list');
    const start = currentPage * countriesPerPage;
    const end = start + countriesPerPage;
    const countriesToDisplay = filteredCountries.slice(start, end);
    
    countriesToDisplay.forEach(country => {
        const card = document.createElement('div');
        card.classList.add('country-card');
        const isFavorite = favorites.includes(country.cca3);

        card.innerHTML = `
            <h3>${country.name.common}</h3>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
            <button class="favorite-btn">${isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}</button>
        `;

        card.querySelector('.favorite-btn').onclick = (e) => {
            e.stopPropagation();
            toggleFavorite(country);
            updateFavoriteButton(card.querySelector('.favorite-btn'), country);
        };

        card.onclick = () => showCountryDetails(country.cca3);
        countryList.appendChild(card);
    });

    document.getElementById('show-more').style.display = (end < filteredCountries.length) ? 'block' : 'none';
}

function showCountryDetails(countryCode) {
    window.location.href = `country.html?country=${countryCode}`;
}

function toggleFavorite(country) {
    if (favorites.includes(country.cca3)) {
        favorites = favorites.filter(fav => fav !== country.cca3);
    } else if (favorites.length < 5) {
        favorites.push(country.cca3);
    } else {
        alert("You can only have up to 5 favorites.");
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
}

function updateFavoriteButton(button, country) {
    const isFavorite = favorites.includes(country.cca3);
    button.textContent = isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites';
}

function renderFavorites() {
    const favoriteCountries = document.getElementById('favorite-countries');
    favoriteCountries.innerHTML = '';
    
    if (favorites.length > 0) {
        document.getElementById('favorites').classList.remove('hidden');
        
        favorites.forEach(fav => {
            const country = countries.find(c => c.cca3 === fav);
            if (country) {
                const favDiv = document.createElement('div');
                favDiv.classList.add('favorite-country');
                favDiv.innerHTML = `
                    <img src="${country.flags.svg}" alt="${country.name.common} flag">
                    <span>${country.name.common}</span>
                `;
                favDiv.onclick = () => showCountryDetails(country.cca3);
                favoriteCountries.appendChild(favDiv);
            }
        });
    } else {
        document.getElementById('favorites').classList.add('hidden');
    }
}

document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm));
    currentPage = 0;
    document.getElementById('country-list').innerHTML = '';
    renderCountries(filteredCountries);

    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';
    if (searchTerm) {
        const filteredSuggestions = filteredCountries.slice(0, 5);
        filteredSuggestions.forEach(country => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.innerText = country.name.common;
            suggestionItem.onclick = () => {
                document.getElementById('search').value = country.name.common;
                suggestions.innerHTML = '';
                renderCountries(filteredCountries);
            };
            suggestions.appendChild(suggestionItem);
        });

        if (filteredCountries.length > 5) {
            const viewAll = document.createElement('div');
            viewAll.classList.add('suggestion-item');
            viewAll.innerText = 'View all';
            viewAll.onclick = () => {
                renderCountries(filteredCountries);
                suggestions.innerHTML = '';
            };
            suggestions.appendChild(viewAll);
        }
    }
});

document.getElementById('show-more').addEventListener('click', () => {
    currentPage++;
    renderCountries();
});
