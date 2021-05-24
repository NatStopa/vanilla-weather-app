function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemp(response) {
  let tempElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#current-city");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#current-condition-icon");
  let descriptionId = response.data.weather[0].id;
  console.log(response.data.weather);
  console.log(descriptionId);
  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  if (descriptionId === 801) {
    iconElement.setAttribute("src", `images/few_clouds.png`);
  } else if (descriptionId === 802) {
    iconElement.setAttribute("src", `images/scattered_clouds.png`);
  } else if (descriptionId === 803 || descriptionId === 804) {
    iconElement.setAttribute("src", `images/broken_clouds.png`);
  } else if (descriptionId === 800) {
    iconElement.setAttribute("src", `images/clear_sky.png`);
  } else if (
    (descriptionId >= 600 && descriptionId < 623) ||
    descriptionId === 511
  ) {
    iconElement.setAttribute("src", `images/snow.png`);
  } else if (descriptionId >= 300 && descriptionId < 322) {
    iconElement.setAttribute("src", `images/broken_clouds.png`);
  } else if (descriptionId >= 200 && descriptionId < 233) {
    iconElement.setAttribute("src", `images/thunderstorm.png`);
  } else if (descriptionId >= 701 && descriptionId < 782) {
    iconElement.setAttribute("src", `images/mist.png`);
  } else if (descriptionId >= 500 && descriptionId < 505) {
    iconElement.setAttribute("src", `images/cloudy.png`);
  } else if (descriptionId >= 520 && descriptionId < 532) {
    iconElement.setAttribute("src", `images/shower_rain.png`);
  }
}

let apiKey = "02ae2bfab4b783181c5ec4a0935ec345";
let unit = "metric";
let city = "Krakow";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemp);
