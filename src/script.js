const showPosition = (position) => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4992ca33f4c941bf95d8f6937ef59491";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp), changeCity, showForecast;
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8eb322b04629a0b2fdac0ac79561148e&units=metric`;
  axios.get(apiUrlForecast).then(showForecast);
};

const getPosition = () => {
  navigator.geolocation.getCurrentPosition(showPosition);
};
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getPosition);

const showTemp = (response) => {
  let currentCity = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${currentCity}`;
  let celsiusTemperature = Math.round(response.data.main.temp);
  let tempNumber = document.querySelector("#temp-number");
  let weatherIcon = document.querySelector("#icon");
  tempNumber.innerHTML = celsiusTemperature;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
};

const changeCity = (city) => {
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city}`;
  let apiUrlName = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8eb322b04629a0b2fdac0ac79561148e&units=metric`;
  axios.get(apiUrlName).then(changeTemp);

  apiUrlName = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8eb322b04629a0b2fdac0ac79561148e&units=metric`;
  axios.get(apiUrlName).then(showIcon);

  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8eb322b04629a0b2fdac0ac79561148e&units=metric`;
  axios.get(apiUrlForecast).then(showForecast);
};

const showForecast = (response) => {
  let dayOne = document.querySelector("#day-one");
  let iconOne = document.querySelector("#icon-one");
  let tempOne = document.querySelector("#temp-one");
  dayOne.innerHTML = `${days[now.getDay() + 1]}`;
  tempOne.innerHTML = Math.round(response.data.list[0].main.temp);
  iconOne.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`
  );

  let dayTwo = document.querySelector("#day-two");
  let iconTwo = document.querySelector("#icon-two");
  let tempTwo = document.querySelector("#temp-two");
  dayTwo.innerHTML = `${days[now.getDay() + 2]}`;
  tempTwo.innerHTML = Math.round(response.data.list[8].main.temp);
  iconTwo.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.list[8].weather[0].icon}@2x.png`
  );

  let dayThree = document.querySelector("#day-three");
  let iconThree = document.querySelector("#icon-three");
  let tempThree = document.querySelector("#temp-three");
  dayThree.innerHTML = `${days[now.getDay() + 3]}`;
  tempThree.innerHTML = Math.round(response.data.list[16].main.temp);
  iconThree.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.list[16].weather[0].icon}@2x.png`
  );

  let dayFour = document.querySelector("#day-four");
  let iconFour = document.querySelector("#icon-four");
  let tempFour = document.querySelector("#temp-four");
  dayFour.innerHTML = `${days[now.getDay() + 4]}`;
  tempFour.innerHTML = Math.round(response.data.list[24].main.temp);
  iconFour.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.list[24].weather[0].icon}@2x.png`
  );

  let dayFive = document.querySelector("#day-five");
  let iconFive = document.querySelector("#icon-five");
  let tempFive = document.querySelector("#temp-five");
  dayFive.innerHTML = `${days[now.getDay() + 5]}`;
  tempFive.innerHTML = Math.round(response.data.list[32].main.temp);
  iconFive.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.list[32].weather[0].icon}@2x.png`
  );
};

const searchCity = (event) => {
  event.preventDefault();
  let searchInput = document.querySelector("#city-value");
  changeCity(searchInput.value);
};

const showIcon = (response) => {
  console.log(response.data);
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
};

const changeTemp = (response) => {
  celsiusTemperature = Math.round(response.data.main.temp);
  let tempNumber = document.querySelector("#temp-number");
  tempNumber.innerHTML = celsiusTemperature;
  let humidity = document.querySelector("#humidity");
  let windspeed = document.querySelector("#windspeed");

  humidity.innerHTML = response.data.main.humidity;
  windspeed.innerHTML = Math.round(response.data.wind.speed);
};
const showFahrenheit = (event) => {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let tempNumber = document.querySelector("#temp-number");
  tempNumber.innerHTML = Math.round(fahrenheitTemperature);
};

const showCelsius = (event) => {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempNumber = document.querySelector("#temp-number");
  tempNumber.innerHTML = celsiusTemperature;
};

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

let celsiusTemperature = null;

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let h3 = document.querySelector("h3");
h3.innerHTML = `${day} ${hour}:${minute}`;

changeCity("Bath");
