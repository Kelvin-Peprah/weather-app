const apiKey = 'e810c2bdc8d1abdf5d04f5be15060855';
const apiURL =
	'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.getElementById('search');
const searchButton = document.getElementById('search-button');
let weatherImagePath = '';

let weatherHTML = '';
const checkWeather = async (cityName) => {
	try {
		const response = await fetch(apiURL + cityName + `&appid=${apiKey}`);
		if (!response.ok) throw new Error('Weather data not found');
		const data = await response.json();

		//change weather image when weather updates
		if (data.weather[0].main === 'Clouds') {
			weatherImagePath = 'images/clouds.png';
		} else if (data.weather[0].main === 'Clear') {
			weatherImagePath = 'images/clear.png';
		} else if (data.weather[0].main === 'Rain') {
			weatherImagePath = 'images/rain.png';
		} else if (data.weather[0].main === 'Drizzle') {
			weatherImagePath = 'images/drizzle.png';
		} else if (data.weather[0].main === 'Mist') {
			weatherImagePath = 'images/mist.png';
		} else if (data.weather[0].main === 'Snow') {
			weatherImagePath = 'images/snow.png';
		} else {
			weatherImagePath = 'image unavailable';
		}

		// Update weatherHTML
		weatherHTML = `
      <div>
      <img src="${weatherImagePath}" alt="${data.weather[0].description}" 
        class="weather-icon" />
       <h1 class="temp">${Math.round(data.main.temp)}&deg;C</h1>
       <h2 class="city">${data.name}</h2>
       <div class="details">
         <div class="col">
           <img src="images/humidity.png" alt="humidity" class="humidity-icon" />
           <div>
             <p class="humidity">${data.main.humidity}%</p>
           </div>
         </div>
         <div class="col">
           <img src="images/wind.png" alt="wind" class="wind-icon" />
           <div>
             <p class="wind">${(data.wind.speed * 3.6).toFixed(1)} km/h</p>
             <p>Wind speed</p>
           </div>
         </div>
       </div>
      </div> 
    `;
		document.querySelector('.js-weather').innerHTML = weatherHTML;
	} catch (error) {
		console.error('Error fetching weather data:', error);
		document.querySelector(
			'.card'
		).innerHTML = `<p>Error loading weather data. Enter a valid city!</p>`;
	}
};

searchButton.addEventListener('click', () => {
	checkWeather(searchBox.value);
	searchBox.value = '';
});

searchBox.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		checkWeather(searchBox.value);
		searchBox.value = '';
	}
});
