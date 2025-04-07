// 🛑 Remplace "TA_CLE_API" par ta propre clé OpenWeatherMap
const API_KEY = "TA_CLE_API";

// Sélection des éléments HTML
const searchButton = document.getElementById("search");
const cityInput = document.getElementById("city");
const weatherResult = document.getElementById("weatherResult");
// bonus bonus bonus
const geoButton = document.getElementById("geoLocation");

// 🎯 Fonction pour récupérer la météo via l'API OpenWeatherMap
async function getWeather(city) {
    // Construire l'URL de requête avec la ville et la clé API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;

    try {
        // Effectuer la requête avec fetch()
        const response = await fetch(url);

        // Vérifier si la requête a réussi
        if (!response.ok) {
            throw new Error("Ville introuvable");
        }

        // Convertir la réponse en JSON
        const data = await response.json();

        // Afficher les données météo
        displayWeather(data);
    } catch (error) {
        // Afficher un message d'erreur en cas de problème
        weatherResult.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
    }
}

// 🎨 Fonction pour afficher la météo sur la page
function displayWeather(data) {
    const city = data.name;
    const country = data.sys.country;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    // Mise à jour du HTML avec les données récupérées
    weatherResult.innerHTML = `
        <h2>${city}, ${country}</h2>
        <p>🌡️ Température : <strong>${temperature}°C</strong></p>
        <p>🌥️ Conditions : ${description}</p>
        <img src="http://openweathermap.org/img/w/${icon}.png" class="weather-icon" alt="Icône météo">
    `;
}

//Debut section bonus

// 🎯 Fonction pour récupérer la météo avec la géolocalisation
function getLocationWeather() {
    // Vérifier si la géolocalisation est disponible
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            await getWeatherByCoords(lat, lon);
        }, () => {
            alert("Géolocalisation refusée ou indisponible.");
        });
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
}

// 🎯 Fonction pour récupérer la météo avec les coordonnées GPS
async function getWeatherByCoords(lat, lon) {
    // Construire l'URL de requête avec les coordonnées GPS
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherResult.innerHTML = `<p style="color: red;">Erreur : Impossible de récupérer la météo.</p>`;
    }
}

// Fin section bonus n'oublie pas le addEventListener pour le bouton geolocaliser



// 📌 Ajouter des événements aux boutons
searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Veuillez entrer un nom de ville.");
    }
});


// 📌 Ajouter un événement pour la géolocalisation
geoButton.addEventListener("click", getLocationWeather);
