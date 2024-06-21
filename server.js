const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;
const API_KEY = '815c15897dd6953dd435016e80011478'; // Replace with your OpenWeather API key

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to fetch weather data
app.get('/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).send({ error: 'City is required' });
    }

    try {
        const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });
        res.send(response.data);
    } catch (error) {
        // Log the error details
        console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
        res.status(500).send({
            error: 'Error fetching weather data',
            details: error.response ? JSON.stringify(error.response.data) : error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



// 815c15897dd6953dd435016e80011478
