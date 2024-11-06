let countries = []; // To hold countries data
let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Load favorites from local storage

// Fetch all countries data for favorites
async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    countries = await response.json();
}

// On document load, get the country code from URL and load country details
document.addEventListener('DOMContentLoaded', async () => {
    await fetchCountries(); // Fetch countries data
    const params = new URLSearchParams(window.location.search);
    const countryCode = params.get('country');
    if (countryCode) {
        loadCountryDetails(countryCode);
    }
});

// Fetch details of a specific country
async function loadCountryDetails(countryCode) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const country = await response.json();
        renderCountryDetails(country[0]);
    } catch (error) {
        console.error("Error fetching country details:", error);
    }
}

// Render country details
function renderCountryDetails(country) {
    const detailsContent = document.getElementById('details-content');
    detailsContent.innerHTML = `
        <div class="country-card">
            <h2>${country.name.common}</h2>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
            <p><strong>Top Level Domain:</strong> ${country.tld ? country.tld.join(', ') : 'N/A'}</p>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Area:</strong> ${country.area} km²</p>
            <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
            <button class="favorite-btn" onclick="toggleFavorite('${country.cca3}')">
                ${favorites.includes(country.cca3) ? '★ Remove from Favorites' : '☆ Add to Favorites'}
            </button>
        </div>
    `;
}

// Toggle favorite countries on detail page
function toggleFavorite(countryCode) {
    if (favorites.includes(countryCode)) {
        favorites = favorites.filter(fav => fav !== countryCode);
    } else if (favorites.length < 5) {
        favorites.push(countryCode);
    } else {
        alert("You can only have up to 5 favorites.");
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderCountryDetails(countries.find(c => c.cca3 === countryCode)); // Update the displayed details
}
