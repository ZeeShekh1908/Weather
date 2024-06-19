async function getWeather() {
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById('weather-result').innerText = `Error: ${data.error}. Details: ${data.details}`;
        } else {
            document.getElementById('weather-result').innerHTML = `
                <h3>Weather in ${data.name}</h3>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
        }
    } catch (error) {
        document.getElementById('weather-result').innerText = 'Error fetching weather data';
    }
}
