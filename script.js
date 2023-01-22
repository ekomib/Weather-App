const inputLocation = document.getElementsByClassName("#form-box");
const theWeather = document.querySelector("#weather");
const dateEl = document.querySelector("#date");
const time = document.querySelector("#time");

const getWeatherObject = async (city) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=48d6354d5e6042178cd235356232101&q=${city}&aqi=no`
  );

  if (response.status === 200) {
    const data = await response.json();
    console.log(data);

    console.log(data.current.temp_c);

    return data.current.temp_c;
  } else {
    throw new Error("Unable to get weather details");
  }
};

document.querySelector("#form-box").addEventListener("submit", (e) => {
  e.preventDefault();

  const dateFormat = moment();
  console.log(dateFormat);
  dateEl.textContent = `Date: ${dateFormat.format("MMM D, YYYY")}`;
  time.textContent = `Time: ${dateFormat.format("LT")}`;

  const theLocationValue = e.target.elements.location.value
    .trim()
    .toUpperCase();

  const upperFirstLocation =
    theLocationValue.charAt(0).toUpperCase() + theLocationValue.slice(1);

  getWeatherObject(upperFirstLocation)
    .then((data) => {
      console.log(data);
      theWeather.textContent = `Weather: The temperature in ${theLocationValue} is ${data}°C`;
    })
    .catch((error) => {
      theWeather.textContent = error;
    });

  e.target.elements.location.value = "";
});
