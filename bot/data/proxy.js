const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors()); // Enable CORS for all routes
const PORT = 5000;

app.use(express.json());

app.post('/api/bitvavo', async (req, res) => {
    const { symbol, interval, start_date, end_date } = req.body;
    try {
        const response = await axios.get('https://api.bitvavo.com/v2/tickers', { 
        headers: {
            // 'Access-Control-Allow-Origin': '*', // Allow all origins
        },
            params: {
                market: symbol,
                interval: interval,
                start: start_date,
                end: end_date
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Bitvavo:', error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
