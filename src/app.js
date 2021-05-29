function displayDate() {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dateElement = document.querySelector("#current-day");
  let day = days[date.getDay()];
  let hours = date.getHours();
  let hoursElement = document.querySelector("#current-hours");
  let minutes = date.getMinutes();
  let minutesElement = document.querySelector("#current-minutes");
  dateElement.innerHTML = `${day}`;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  hoursElement.innerHTML = `${hours}`;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  minutesElement.innerHTML = `${minutes}`;
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecastElements");
  let forecastHTML = `<div class="row justify-content-md-center">`;
  forecast.forEach(function (forecastDay, index) {
    console.log(forecastDay.weather[0].icon);
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col forecastSection">
        <h3 class="forecastHeading">${formatForecastDate(forecastDay.dt)}</h3>
        <img
        src="images/${forecastDay.weather[0].icon}.png"
        alt="Condition Icon"
        class="forecastConditionIcon"
        width="45px"
        />
        <p class="forecastWeather">
        <span class="forecastTemp">${Math.round(forecastDay.temp.day)}</span>°C
          </p>
          </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "02ae2bfab4b783181c5ec4a0935ec345";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let tempElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#current-city");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let descriptionElement = document.querySelector("#current-description");
  let iconElement = document.querySelector("#current-condition-icon");
  celsiusTemp = response.data.main.temp;
  tempElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "02ae2bfab4b783181c5ec4a0935ec345";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  searchCity(cityInputElement.value);
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "02ae2bfab4b783181c5ec4a0935ec345";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&APPID=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let iconSource = null;

let searchForm = document.querySelector(".searchBar");
searchForm.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getPosition);

searchCity("Warsaw");

displayDate();
