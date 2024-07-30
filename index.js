async function getData(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=M8PYVHVEW3CC6YT3MM9U8ERJ5&contentType=json`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        // console.log({
        //     conditions: data.currentConditions.conditions,
        //     temp: data.currentConditions.temp,
        //     feelslike: data.currentConditions.feelslike,
        //     windspeed: data.currentConditions.windspeed,
        //     humidity: data.currentConditions.humidity,
        // });
        return {
            conditions: data.currentConditions.conditions,
            temp: data.currentConditions.temp,
            feelslike: data.currentConditions.feelslike,
            windspeed: data.currentConditions.windspeed,
            humidity: data.currentConditions.humidity,
        };
    } catch (error) {
        console.error(error.message);
    }
}

function displayWeather(location, data) {
    const cityH3 = document.querySelector(".city");
    const conditionP = document.querySelector(".condition");
    const temperatureH2 = document.querySelector(".temperature");
    const feelslikeP = document.querySelector(".feels-like");
    const windspeedP = document.querySelector(".wind-speed");
    const humidityP = document.querySelector(".humidity");

    cityH3.textContent = location;
    conditionP.textContent = data.conditions;
    temperatureH2.textContent = `${data.temp}°C`;
    feelslikeP.textContent = `Feels like: ${data.feelslike}°C`;
    windspeedP.textContent = `Wind speed: ${data.windspeed} km/h`;
    humidityP.textContent = `Humidity: ${data.humidity}%`;
}

async function controller(location = "Thessaloniki") {
    const data = await getData(location);
    displayWeather(location, data);
}

formButton = document.querySelector("button");
formButton.addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.querySelector("input");
    const location = input.value;
    controller(location);
});

controller().then(() => console.log("Weather data loaded"));
