"Country Explorer"

A web application to explore countries, view their flags, add them to favorites, and search for specific countries. This app uses the Rest Countries API to fetch country data and allows users to interact with it by adding favorites, searching, and viewing country details.

Features
Search for Countries: Search countries by name and view results dynamically.
Add to Favorites: Users can add up to 5 countries to their favorites.
Display Country Details: Click on a country to view more details.
Show More: Paginate the country list with a "Show More" button.
Favorites Sidebar: A fixed sidebar that shows favorite countries.

Technologies Used
HTML: For the structure of the webpage.
CSS: For styling the user interface.
JavaScript: To fetch data, manage UI updates, and handle user interactions.
Rest Countries API: To fetch country data (e.g., name, flag, etc.).

Setup & Installation
1. Clone the repository:
bash
Copy code
https://github.com/nikitaverma18/CountryExplorer.git
2. Open the project folder:
bash
Copy code
cd country-explorer

Project Structure:-
country-explorer/
│
├── index.html               # Main HTML file
├── Explorer.css             # Stylesheet for the app
├── Explorer.js              # JavaScript for the app functionality
└── country-icon.png         # Favicon image
├── country.html             # country Details html file
├── country.css              # Stylesheet for the country details
├── country.js               # javascript for the country details

Files:-

index.html: The HTML structure, including the header, country list, and search bar.
Explorer.css: The styling of the webpage, including layout, fonts, and colors.
Explorer.js: Handles fetching country data from the API, rendering countries, managing favorites, and searching for countries.

How It Works:- 

Fetching Data: On page load, the app fetches all country data using the Rest Countries API.
Rendering Countries: The app displays a list of countries with flags, allowing the user to add or remove countries from their favorites.
Search Functionality: The user can type a country name in the search bar to filter countries dynamically. Matching results are displayed with suggestions.
Favorites: Users can add up to 5 countries to their favorites, which are saved in the browser’s local storage.
Show More: The app loads a set number of countries per page and displays a "Show More" button to load more countries.
Usage
Search for a country using the search bar at the top of the page.
Click on any country card to view more details (in this case, it redirects to a country detail page).
Add a country to your favorites by clicking the "☆ Add to Favorites" button. You can also remove it by clicking the "★ Remove from Favorites" button.
To see your favorite countries, open the sidebar on the right side of the page.
