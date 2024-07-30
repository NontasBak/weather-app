async function getData(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=M8PYVHVEW3CC6YT3MM9U8ERJ5&contentType=json`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
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

// getData("Thessaloniki").then((data) => console.log(data));
