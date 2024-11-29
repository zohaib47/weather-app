const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const time = document.getElementById('time');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


async function checkWeather(city) {
    const api_key = "743f7a9b4d0b2d5c63cfceaef8b62fb1";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    pressure.innerHTML = `${weather_data.main.pressure}hpa`;









    // Data from API (example values)
    const sunriseTimestamp = weather_data.sys.sunrise;
    const sunsetTimestamp = weather_data.sys.sunset;
    const timezoneOffset = weather_data.timezone;

    // Current time
    const currentDate = new Date();
    const currentTimestamp = Math.floor(currentDate.getTime() / 1000); // Current time in seconds

    // Function to format time into HH:MM:SS
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Calculate and display results
    let message;

    if (currentTimestamp < sunriseTimestamp) {
        // Before sunrise
        const timeUntilSunrise = sunriseTimestamp - currentTimestamp;
        message = `Sunrise will occur in ${formatTime(timeUntilSunrise)}.`;
        time.innerHTML = message;
    } else if (currentTimestamp < sunsetTimestamp) {
        // After sunrise but before sunset
        const timeUntilSunset = sunsetTimestamp - currentTimestamp;
        message = `Sunrise has occurred. Sunset will occur in ${formatTime(timeUntilSunset)}.`;
        time.innerHTML = message;

    } else {
        // After sunset (night time)
        message = "Sunrise has occurred, and it's now night time.";
        time.innerHTML = message;

    }




    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "./assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "./assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "./assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "./assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "./assets/snow.png";
            break;

    }

    console.log(weather_data);
}


searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});


inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkWeather(inputBox.value);
    }
});





