const form = document.querySelector(".form");
const form__input = document.querySelector(".form__input");
const API__KEY = "e1a13303b7850a69cecbb98ff8edcb16";

form.addEventListener("submit", submitHandler);

async function submitHandler(event) {
    event.preventDefault();
    const cityName = form__input.value.trim();
    const cityInfo = await getGeo(cityName);

    if (!cityInfo.length) return;

    const weatherInfo = await getWeather(cityInfo[0]["lat"], cityInfo[0]["lon"]);

    const weatherData = {
        humidity: weatherInfo.main.humidity,
        temp: weatherInfo.main.temp,
        wind: weatherInfo.wind.speed,
        name: weatherInfo.name,
        main: weatherInfo.weather[0]["main"],
    };

    renderWeather(weatherData);
}

async function getGeo(name) {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API__KEY}`;
    const response = await fetch(geoUrl);
    const data = await response.json();

    return data;
}

async function getWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API__KEY}`;
    const response = await fetch(weatherUrl);
    const data = await response.json();

    console.log(data);

    return data;
}

function renderWeather(obj) {
    const temperature = document.querySelector(".weather__temp");
    const selectTheCity = document.querySelector(".weather__city");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    const img = document.querySelector(".weather__img");

    selectTheCity.innerHTML = obj.name;
    temperature.innerHTML = `${Math.round(obj.temp)} °c`;
    humidity.innerHTML = `${obj.humidity} %`;
    wind.innerHTML = `${Math.round(obj.wind)} km/h`;

    const fileNames = {
        Clouds: "clouds",
        Clear: "clear",
        Rain: "rain",
        MIst: "mist",
        Drizzle: "drizzle",
        Snow: "snow",
    };

    if (fileNames[obj.main]) {
        img.src = `./img/weather/${fileNames[obj.main]}.png`;
    }
}
