const displayWeather = (response) => {
  let weatherDiv = document.querySelector("#weather");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;

  weatherDiv.innerHTML = `It is ${temperature} degrees, ${description}, in ${response.data.name}`;
};

let city = "Rome";
let apiKey = "4992ca33f4c941bf95d8f6937ef59491";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(displayWeather);
